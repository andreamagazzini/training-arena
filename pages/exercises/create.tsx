import Input from "../../components/Input";
import Select from "../../components/Select";

const HORIZONTAL_LINES_OPTIONS = [
    {
        label: "Top",
        value: "1"
    },
    {
        label: "Center",
        value: "2"
    },
    {
        label: "Bottom",
        value: "3"
    }
]

const VERTICAL_LINES_OPTIONS = [
    {
        label: "Left",
        value: "1"
    },
    {
        label: "Leftish",
        value: "2"
    },
    {
        label: "Middle",
        value: "3"
    },
    {
        label: "Rightish",
        value: "4"
    },
    {
        label: "Right",
        value: "5"
    }
]

const TARGET_OPTIONS = [
    {
        label: "T1",
        value: "T1"
    },
    {
        label: "T2",
        value: "T2"
    },
    {
        label: "T3",
        value: "T3"
    },
    {
        label: "T4",
        value: "T4"
    },
    {
        label: "T5",
        value: "T5"
    }
]

const TARGET_COLOR_OPTIONS = [
    {
        label: "Red",
        value: "red"
    },
    {
        label: "Green",
        value: "green"
    },
    {
        label: "Blue",
        value: "blue"
    },
    {
        label: "Yellow",
        value: "yellow"
    },
    {
        label: "Fucsia",
        value: "fucsia"
    }
]

const CreateExercisePage = () => {
    return (
        <div className="p-20 text-white flex flex-col gap-15">
            <h1 className="text-2xl">Create Exercise</h1>
            <form className="flex flex-row">
                <div className="flex flex-col w-1/2 gap-5 p-5">
                    <Input placeholder="Name" id="name" name="name" />
                    <Input placeholder="Description" id="description" name="description" />
                    <Select 
                        placeholder="Seleziona linee orizzontali"
                        options={HORIZONTAL_LINES_OPTIONS}
                        defaultValues={[]}
                    />
                    <Select 
                        placeholder="Seleziona linee verticali"
                        options={VERTICAL_LINES_OPTIONS}
                        defaultValues={[]}
                    />
                </div>
                <div className="flex flex-col w-1/2 gap-5 p-5">
                    <input className="p-3" placeholder="Series name" type="text" id="series-name" name="series-name" />
                    <Select
                        placeholder="Seleziona tipo di target"
                        options={TARGET_OPTIONS}
                        defaultValues={""}
                    />
                    <Select
                        placeholder="Seleziona colore target"
                        options={TARGET_COLOR_OPTIONS}
                        defaultValues={""}
                    />
                    <select multiple className="p-3 text-black" id="target" name="target">
                        <option value="">Target size</option>
                        <option value="left">Small</option>
                        <option value="leftish">Medium</option>
                        <option value="bottom">Large</option>
                        <option value="leftish">Very Large</option>
                    </select>
                    <div className="w-full flex flex-row justify-between gap-2">
                        <div className="flex flex-row self-center gap-2">
                            <input type="radio" name="type" id="type_time" />
                            <label htmlFor="type_time">Time</label>
                        </div>
                        <div className="flex flex-row self-center gap-2">
                            <input type="radio" name="type" id="type_hit" />
                            <label htmlFor="type_hit">Hit</label>
                        </div>
                        <input className="p-3" placeholder="Sec or times" type="number" />
                    </div>
                    <div className="w-full flex flex-row justify-between gap-2">
                        <div className="flex flex-row self-center gap-2">
                            <input type="checkbox" name="preview" id="type_time" />
                            <label htmlFor="type_time">Preview Target</label>
                        </div>
                        <div className="flex flex-row self-center gap-2">
                            <input type="checkbox" name="fake-target" id="type_hit" />
                            <label htmlFor="type_hit">Fake Target</label>
                        </div>
                        <input className="p-3" placeholder="Sec or times" type="number" />
                    </div>

                </div>
            </form>
        </div>
    );
}

export default CreateExercisePage;
