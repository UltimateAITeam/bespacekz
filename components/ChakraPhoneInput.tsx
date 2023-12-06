import {CountrySelector, usePhoneInput} from "react-international-phone";
import {Button, Input} from "@chakra-ui/react";


interface ChakraPhoneProps {
    value: string;
    onChange: (phone: string) => void;
}
export const ChakraPhoneInput: React.FC<ChakraPhoneProps> = ({
    value,
    onChange,
}) => {
    const phoneInput = usePhoneInput({
        defaultCountry: 'kz',
        value,
        onChange: (data) => {
            onChange(data.phone);
        },
    });

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {/*<CountrySelector*/}
            {/*    selectedCountry={phoneInput.country.iso2}*/}
            {/*    onSelect={(country) => phoneInput.setCountry(country.iso2)}*/}
            {/*    renderButtonWrapper={({ children, rootProps }) => (*/}
            {/*        <Button {...rootProps} variant="outline" px="4px" mr="8px">*/}
            {/*            {children}*/}
            {/*        </Button>*/}
            {/*    )}*/}
            {/*/>*/}
            <Input
                placeholder="Phone number"
                type="tel"
                color="primary"
                value={phoneInput.inputValue}
                onChange={phoneInput.handlePhoneValueChange}
                width={200}
                ref={phoneInput.inputRef}
            />
        </div>
    );
};