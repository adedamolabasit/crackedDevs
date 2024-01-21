import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import { LatLngTuple } from "leaflet";

type DashboardContextType = {
  jobData: any[]; 
  userLocation: LatLngTuple | undefined;
  geoCode: (data: string) => Promise<number[][]>;
  geoLocation: number[][];
  markers: any;
  isUpload: boolean;
  isResumeUploader: boolean;
  uploadJob: () => void;
  uploadResume: () => void;
};

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider: React.FC<DashboardProviderProps> = ({
  children,
}) => {
  const [jobData, setJobData] = useState<any[]>([]);
  const [userLocation, setUserLocation] = useState<LatLngTuple>();
  const [geoLocation, setGeoLocation] = useState<number[][]>([]);
  const [markers, setMarkers] = useState<
    { position: LatLngTuple; title: string }[]
  >([]);
  const [isUpload, setIsUpload] = useState(false);
  const [isResumeUploader, setIsResumeUploader] = useState(false);
  const fetchData = async () => {
    const baseUrl = "https://api.crackeddevs.com/api/get-jobs?location_iso=US";
    const apiKey = "b178dbf6-1e50-4a8b-a6a0-263bb57905b7";
    try {
      const response = await axios.get(baseUrl, {
        headers: {
          "api-key": apiKey,
        },
      });
      setJobData(response.data);
      const newMarkers: { position: LatLngTuple; title: string }[] =
        await Promise.all(
          response.data.map(async (job: any) => {
            const geoCoded = await geoCode(job.location_iso);
            return geoCoded.length > 0
              ? { position: geoCoded[0], title: job.title }
              : undefined;
          })
        );

      setMarkers(newMarkers.filter((marker) => marker !== undefined));
      console.log(markers, "noGo");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const geoCode = async (data: string): Promise<number[][]> => {
    if (data) {
      const baseUrl = `https://geocode.maps.co/search?q=${data}&api_key=65abdd85cbd4a197839714umveaae74`;

      try {
        const response = await axios.get(baseUrl);

        const newGeoLocations = response.data.map((locate: any) => {
          console.log(locate?.lon, locate?.lat, "looolewjw");
          if (locate) {
            return [locate?.lat, locate?.lon];
          }
          return [];
        });

        setGeoLocation(newGeoLocations);
        console.log(geoLocation, "Response223ewfrwf");

        return newGeoLocations;
      } catch (error) {
        console.error("Error fetching data:", error);
        return [];
      }
    }

    return [];
  };

  const uploadJob = () => {
    setIsUpload((prevState) => !prevState);
  };
  const uploadResume = () => {
    setIsResumeUploader((prevState) => !prevState);
  };

  useEffect(() => {
    geoCode("yourDefaultLocation");
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log(latitude, "de");
        setUserLocation([latitude, longitude]);
      },
      (error) => {
        console.error("Error getting user location:", error.message);
      }
    );
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        jobData,
        userLocation,
        geoCode,
        geoLocation,
        markers,
        uploadJob,
        isUpload,
        uploadResume,
        isResumeUploader,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};
