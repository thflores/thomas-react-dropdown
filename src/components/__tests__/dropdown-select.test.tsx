import React from "react";
import options from "../../api/options.json";
import DropdownSelect, { DropdownSelectProps } from "../dropdown-select";
import { render, waitFor } from "@testing-library/react";

const mockAttributes: DropdownSelectProps = {
    onChange: () => console.log('onChange fired'),
    toggleOpen: () => console.log('toggleOpen fired'),
    optionList: options.colors,
    open: true,
    isSearchable: true,
    label: "Select a color"
}

describe(DropdownSelect, () => {
    it("All options are displayed when dropdown is open and searchbox is displayed with isSearchable", async () => {

        const { getByTestId } = render(
            <DropdownSelect {...mockAttributes} />
        );

        mockAttributes.optionList.forEach(async mockOption => {
            expect(getByTestId(`option-${mockOption.label}`)).toBeInTheDocument();
        });

        expect(getByTestId("search-box")).toBeInTheDocument();
    });

    it("All options and searchbox are not displayed when dropdown is closed", async () => {

        const { queryByTestId } = render(
            <DropdownSelect {...mockAttributes} open={false} />
        );

        mockAttributes.optionList.forEach(async mockOption => {
            expect(queryByTestId(`option-${mockOption.label}`)).toBeNull();
        });

        expect(queryByTestId("search-box")).toBeNull();
    });
    
    it("Search box is not displayed when isSearchable is false", async () => {
        const { queryByTestId } = render(
            <DropdownSelect {...mockAttributes} isSearchable={false} />
        );

        expect(queryByTestId("search-box")).toBeNull();
    });
});