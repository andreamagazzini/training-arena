import { ChangeEvent, FC, useEffect, useState } from "react";

type Options = {
    value: string,
    label: string
}

export enum InputType {
    text = "text",
    number = "number"
}

type Props = {
    options: Options[]
    defaultValues: [number | string, string],
    onChange: (values: [number | string, string]) => void,
    placeholder?: string,
    type?: InputType
}

const InputWithDropdown: FC<Props> = ({
    options,
    defaultValues,
    onChange,
    placeholder = "Seleziona una opzione",
    type = InputType.text
}) => {
    const [values, setValues] = useState(defaultValues)
    const [isOpen, setIsOpen] = useState(false)

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        let value: string | number = e.target.value

        if (type === InputType.number) {
            value = parseInt(e.target.value)
        }

        setValues((prevValues) => ([value, prevValues[1]]))
        onChange(values)
    }

    const handleSelectOption = (value: string) => {
        setValues((prevValues) => ([prevValues[0], value]))
        setIsOpen(false)
    }

    useEffect(() => {
        onChange(values)
    }, [onChange, values])

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
                    options.find((option) => option.value === values[0])?.label
                    }
                    <div className="flex-1 w-full">
                        <input type={type} value={values[0]} placeholder={placeholder} className="py-3 outline-none w-full rounded" onChange={handleChangeInput} />
                    </div>
                </div>
                <div className="text-gray-300 w-32 py-1 pl-2 pr-1 border-l flex items-center border-gray-200">
                    <button type="button" className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none" onClick={() => setIsOpen((value) => !value)}>
                        {options.find((option) => option.value === values[1])?.label}
                    </button>
                </div>
            </div>
            {
                isOpen &&
                <div className="absolute shadow top-14 bg-white z-40 w-full lef-0 rounded max-h-select overflow-y-auto">
                    <div className="flex flex-col w-full text-black">
                        {
                            options.map((option) => (
                                <div
                                    key={option.value}
                                    className="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-teal-100"
                                    onClick={() => handleSelectOption(option.value)}
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

export default InputWithDropdown;
