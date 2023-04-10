import React, { ChangeEvent, InputHTMLAttributes, DetailedHTMLProps, useState, useEffect, useRef } from "react"
import styles from "@styles/components/reusable/inputs/searchInput.module.scss";
import { FiSearch } from "react-icons/fi";

export interface SearchInput_Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    iconAlt?: React.ReactNode | JSX.Element
    wrapperOnClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
    resultsData?: {
        label: string
        value: string
        id: string
    }[],
    onResultClick?: (e: React.MouseEvent<HTMLLIElement, MouseEvent>, result: {label: string, id: string, value: string}) => void
    removeResultsOnClick?: boolean
}

export const SearchInput = ({ onChange, iconAlt, wrapperOnClick, resultsData, onResultClick, removeResultsOnClick = true,  ...otherInputProps }: SearchInput_Props) => {
    const [displayResults, setDisplayResults] = useState<boolean>(true);
    const [selectedResult, setSelectedResult] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);

    function handleResultsDisplayOnClick(e: React.MouseEvent<HTMLLIElement, MouseEvent>, label: string, id: string, value: string) {
        onResultClick && onResultClick(e, { label, id, value});
        if (removeResultsOnClick) {
            setDisplayResults(false);
        }
        setSelectedResult((prev) => label)
    }

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        setSelectedResult((prev) => {
            // console.log(prev);
            return e.target.value;
        });
        onChange && onChange(e);
    }

    useEffect(() => {
        if (resultsData?.length === 0) {
            setDisplayResults(false);
        } else {
            setDisplayResults(true);
        }
    }, [resultsData]);
    

    useEffect(() => {console.log(selectedResult)}, [selectedResult])

    return (
        <div className={styles.search_input_wrapper}>
            <div className={styles.search_input} onClick={wrapperOnClick} data-elm-type="search-input">
                <span>{iconAlt ?? <FiSearch />}</span>
                <input type="text" name="search_query" value={selectedResult} id="query" placeholder={selectedResult.length > 0 ? selectedResult : "Search for anything..."} onChange={handleInputChange} ref={inputRef} data-elm-type={"search-input"} {...otherInputProps} />
            </div>
            {resultsData && displayResults && (
                <div className={styles.search_input_results} data-elm-type="search-input">
                    <ul>
                        {
                            resultsData.map((result) => {
                                return (
                                    <li key={result.id} onClick={(e) => {
                                        console.log(result);
                                        handleResultsDisplayOnClick(e, result.label, result.id, result.value);
                                    }} data-elm-type="search-input-result">
                                        <span>{result.label}</span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            )}
        </div>
    )
}