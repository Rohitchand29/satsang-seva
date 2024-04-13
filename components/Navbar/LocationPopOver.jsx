import { PopoverContent } from "@/components/ui/popover"
import { TbCurrentLocation } from "react-icons/tb";
import { Button } from "../ui/button";


const LocationPopOver = () => {
  return (
      <PopoverContent>
        <div>
          <Button className="flex gap-2" variant="link"><TbCurrentLocation /><p>Use Current Location</p></Button>
        </div>
        <div>
          
        </div>
      </PopoverContent>
  )
} 

export default LocationPopOver