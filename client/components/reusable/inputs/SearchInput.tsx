import { ChangeEvent, InputHTMLAttributes, DetailedHTMLProps } from "react"
import styles from "@styles/components/reusable/inputs/searchInput.module.scss";
import { FiSearch } from "react-icons/fi";

export interface SearchInput_Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    iconAlt?: React.ReactNode | JSX.Element
    wrapperOnClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
    inputRef?: any
}

export const SearchInput = ({ onChange, iconAlt, wrapperOnClick, inputRef, ...otherInputProps }: SearchInput_Props) => {
    return (
        <div className={styles.search_input_wrapper} onClick={wrapperOnClick} data-elm-type="search-input">
            <span>{iconAlt ?? <FiSearch />}</span>
            <input type="text" name="search_query" id="query" placeholder="Search for anything..." onChange={onChange} ref={inputRef} data-elm-type={"search-input"} {...otherInputProps} />
        </div>
    )
}