import { FC, useEffect, useState } from "react";

type Options = {
    value: string | number,
    label: string
}

type Props = {
    options?: Options[]
    defaultValues: string | number | (string | number)[],
    onChange: (values: string | number | (string | number)[]) => void
    placeholder?: string
}

const Select: FC<Props> = ({
    options,
    defaultValues,
    onChange,
    placeholder = "Seleziona una opzione"
}) => {
    const [values, setValues] = useState(Array.isArray(defaultValues) ? defaultValues.map((v) => v.toString()) : defaultValues.toString())
    const [isOpen, setIsOpen] = useState(false)

    const handleRemove = (value: string) =>
        setValues((prevValues) => (prevValues as string[]).filter((v: string) => v !== value))


    const handleAdd = (value: string) =>
        setValues((prevValues) => [...(prevValues as string[]), value])


    const handleSelectOption = (value: string) => {
        if (typeof values === "string") {
            setValues(value)
            setIsOpen(false)
        } else if (values.includes(value)) {
            handleRemove(value)
        } else {
            handleAdd(value)
        }
    }

    useEffect(() => {
        const parsedValues = options?.filter((o) => values.includes(o.value.toString())).map((o) => o.value)

        if(Array.isArray(values)) {
            parsedValues && onChange(parsedValues)    
        } else {
            parsedValues && onChange(parsedValues[0])
        }
    }, [onChange, options, values])

    return (
        <div
            className="w-full flex flex-col items-center relative mx-auto"
            tabIndex={100} //add tabindex here
            onBlur={(e) => {
                const currentTarget = e.currentTarget;

                // Give browser time to focus the next element
                requestAnimationFrame(() => {
                    // Check if the new focused element is a child of the original container
                    if (!currentTarget.contains(document.activeElement)) {
                        setIsOpen(false);
                    }
                });
            }}
        >
            <div className="w-full flex bg-white rounded">
                <div className="flex flex-auto flex-wrap gap-2 px-3 text-black items-baseline">
                    {
                        typeof values === "string" ?
                            options?.find((option) => option.value.toString() === values)?.label
                            :
                            values.map((value) => (
                                <div key={value} className="flex justify-center items-center my-2 font-medium py-1 px-2 bg-white rounded-full text-teal-700 bg-teal-100 border border-teal-300 ">
                                    <div className="text-xs font-normal leading-none max-w-full flex-initial">{options?.find((option) => option.value.toString() === value)?.label}</div>
                                    <div className="flex flex-auto flex-row-reverse">
                                        <div onClick={() => handleRemove(value)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x cursor-pointer hover:text-teal-400 rounded-full w-4 h-4 ml-2">
                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            ))
                    }
                    <div className="flex-1 w-full" onClick={() => setIsOpen((value) => !value)}>
                        <input placeholder={values.length ? "" : placeholder} className="py-3 appearance-none outline-none cursor-pointer w-full rounded" />
                    </div>
                </div>
                <div className="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200">
                    <button type="button" className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none" onClick={() => setIsOpen((value) => !value)}>
                        {isOpen ?
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-up w-4 h-4">
                                <polyline points="18 15 12 9 6 15"></polyline>
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down w-4 h-4">
                                <polyline points="18 10 12 16 6 10"></polyline>
                            </svg>
                        }
                    </button>
                </div>
            </div>
            {
                isOpen &&
                <div className="absolute shadow top-14 bg-white z-40 w-full lef-0 rounded max-h-select overflow-y-auto">
                    <div className="flex flex-col w-full text-black">
                        {
                            options?.map((option) => (
                                <div
                                    key={option.value}
                                    className={`${(typeof values === "string" && values === option.value) || values.includes(option.value.toString()) ? "bg-teal-300" : ""} cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-teal-100`}
                                    onClick={() => handleSelectOption(option.value.toString())}
                                >
                                    <div className="flex w-full items-center p-3 relative">
                                        <div className="w-full items-center flex">
                                            <div className="mx-2 leading-6">{option.label}</div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default Select;
