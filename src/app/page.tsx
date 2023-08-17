import Booking from "@/components/Booking/Booking";
import MapBoxMap from "@/components/Map/MapBoxMap";

export default function Home() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <Booking />
        <div className="col-span-2">
          <MapBoxMap />
        </div>
      </div>
    </div>
  );
}
