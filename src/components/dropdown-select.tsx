import React, { useRef, useState, KeyboardEvent, useEffect } from "react";
import { PiCaretDownBold, PiCaretUpBold } from "react-icons/pi";
import options from "../api/options.json";
import { ListOption } from "../interfaces/option.interface"
// @ts-ignore
import { isEqual } from 'lodash';

export type DropdownSelectProps = {
    optionList: ListOption[],
    onChange: (ListOption) => void,
    isSearchable?: boolean,
    open: boolean,
    label: string,
    value?: ListOption,
    toggleOpen: () => void
}

enum KEYBOARD_KEYS {
    arrowDown = "ArrowDown",
    arrowUp = "ArrowUp",
    enter = "Enter"
}

const DropdownSelect = ({optionList, onChange, isSearchable = false, open, label, value, toggleOpen }: DropdownSelectProps) => {
    const [selectedItem, setSelectedItem] = useState<ListOption>();
    const [searchText, setSearchText] = useState('');
    const [focusIndex, setFocusIndex] = useState(-1);
    const itemRefs = useRef<Array<HTMLButtonElement | HTMLInputElement | null>>([]);

    const selectionMade = (option: ListOption) => {
        // Deselect if option is already selected
        const setOption = selectedItem === option ? undefined : option;
        setSelectedItem(setOption);
        onChange(setOption);
    }

    const keyboardNavigation = (kEvent: KeyboardEvent) => {
        let newFocusIndex;
        switch (kEvent.key) {
            case KEYBOARD_KEYS.arrowDown:
                kEvent.preventDefault();
                const adjust = isSearchable ? 0 : 1; // We want the search box to also be navigatable
                newFocusIndex = focusIndex < filteredOptions.length - adjust ? focusIndex + 1 : focusIndex;
                setFocusIndex(newFocusIndex);
                itemRefs?.current[newFocusIndex]?.focus();
                break;
            case KEYBOARD_KEYS.arrowUp:
                kEvent.preventDefault();
                newFocusIndex = focusIndex > 0 ? focusIndex - 1 : 0;
                setFocusIndex(newFocusIndex);
                itemRefs?.current[newFocusIndex]?.focus();
                break;
            case KEYBOARD_KEYS.enter:
                // selectionMade(optionList[focusIndex])
        }
    }
    
    useEffect(() => {
        if (open && isSearchable) {
            setFocusIndex(0);
            itemRefs?.current[0]?.focus();
        }
    }, [open]);

    const filteredOptions = optionList.filter(option => option.label.toLowerCase().includes(searchText.toLowerCase()));

    return (
        <div className="relative font-medium mb-60 flex flex-col items-center w-[340px] rounded">
            <button onClick={toggleOpen}
                    onKeyDown={keyboardNavigation}
                    data-testid="toggle-button"
                    className="p-1 w-full flex items-center justify-between tex-lg rounded-lg border"
            >
                { selectedItem ? selectedItem.label : label}
                <PiCaretDownBold />
            </button>
            {open && (
                <div className="relative w-full h-0 z-10">
                    <div className="absolute top-1 flex flex-col items-start w-full rounded-lg border max-h-40 overflow-auto">
                        { isSearchable && 
                            <div className="p-1 w-full bg-gray-200">
                                <input  value={searchText}
                                        ref={el => itemRefs.current[0] = el}
                                        className="w-full p-1 rounded-lg border border-blue-600 active:border-2 active:border-blue-600 focus-visible:border-blue-600"
                                        onChange={({target}) => setSearchText(target.value)}
                                        placeholder="Search..."
                                        onKeyDown={keyboardNavigation}
                                        data-testid="search-box"
                                        type="text"
                                />
                            </div>
                        }
                        { filteredOptions.map((option, i) => (
                            <button onClick={() => selectionMade(option)}
                                    ref={el => isSearchable ? itemRefs.current[i + 1] = el : itemRefs.current[i] = el}
                                    onKeyDown={keyboardNavigation}
                                    data-testid={`option-${option.label}`}
                                    className={`flex w-full justify-between p-1 cursor-pointer ${isEqual(option, selectedItem) ? 'hover:bg-selectHighlight bg-select text-white' : 'hover:bg-highlight'}`}
                                    key={i}
                            >
                                <h3>{option.label}</h3>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default DropdownSelect;