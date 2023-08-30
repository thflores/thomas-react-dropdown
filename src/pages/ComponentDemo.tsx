import React, { useEffect, useState } from "react";
import DropdownSelect from "../components/dropdown-select";
import { ListOption } from "../interfaces/option.interface";
import options from "../api/options.json";


function ComponentDemo() {
    const [selectedColor, setSelectedColor] = useState<ListOption>();
    const [selectedSize, setSelectedSize] = useState<ListOption>();
  
    const [colorDropdownOpen, setColorDropdownOpen] = useState(false);
    const [sizeDropdownOpen, setSizeDropdownOpen] = useState(false);
  
    const onSelectColor = (colorOption: ListOption ) => {
      console.log('Color selected', colorOption);

      setSelectedColor(colorOption);
      if (colorOption) {
        setColorDropdownOpen(false);
      }
    }
  
    const onSelectSize = (option: ListOption ) => {
      console.log('Size selected', option);
      setSelectedSize(option);
      if (option) {
        setSizeDropdownOpen(false);
      }
    }
  
    return (
      <div>
        <DropdownSelect optionList={options.colors}
                        label="Select a color"
                        value={selectedColor}
                        open={colorDropdownOpen}
                        data-testid="color-dropdown"
                        toggleOpen={() => setColorDropdownOpen(prev => !prev)}
                        onChange={onSelectColor}
                        isSearchable={true}
        />
        <DropdownSelect optionList={options.sizes}
                        label="Select a size"
                        value={selectedSize}
                        open={sizeDropdownOpen}
                        data-testid="size-dropdown"
                        toggleOpen={() => setSizeDropdownOpen(prev => !prev)}
                        onChange={onSelectSize} 
        />
      </div>
    )
}

export default ComponentDemo;