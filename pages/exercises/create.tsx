import Input from "../../components/Input";
import InputWithDropdown, { InputType } from "../../components/InputWithDropdown";
import Select from "../../components/Select";
import { TARGET_COLOR_OPTIONS, TARGET_OPTIONS, TARGET_SIZE_OPTIONS } from "../../constants/targets";
import { HORIZONTAL_LINES_OPTIONS, VERTICAL_LINES_OPTIONS } from "../../constants/exercises";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

enum UnityType {
    TargetCount = "TargetCount",
    Time = "Time"
}

type ExerciseFormFields = {
    Name: string,
    Description: string,
    HorizontalAreas: number[],
    VerticalAreas: number[],
    Series: string[]
}

type SeriesFormFields = {
    Name: string,
    TargetShape: string,
    TargetSize: string,
    TargetColor: string,
    LimitWithUnity: [number, UnityType],
    PreviewTargetEnabled: boolean,
    FakeTargetsEnabled: boolean
}

const CreateExercisePage = () => {
    const [seriesOptions, setSeriesOptions] = useState([])
    const {
        handleSubmit: handleCreateExercise,
        control: controlExerciseForm
    } = useForm<ExerciseFormFields>()
    const {
        register,
        handleSubmit: handleCreateSeries,
        control: controlSeriesForm
    } = useForm<SeriesFormFields>()

    const onSubmitSeries = async (data: SeriesFormFields) => {
        const { LimitWithUnity, ...rest } = data;

        const body = {
            TargetCountLimit: (LimitWithUnity[1] === UnityType.TargetCount ? LimitWithUnity[0] : 0),
            TargetCountLimitEnabled: LimitWithUnity[1] === UnityType.TargetCount,
            TimeLimit: (LimitWithUnity[1] === UnityType.Time ? LimitWithUnity[0] : 0),
            TimeLimitEnabled: LimitWithUnity[1] === UnityType.Time,
            ...rest
        }
        await axios.post("/api/series", body)
    }

    const onSubmitExercise = async (data: ExerciseFormFields) => {
        await axios.post("/api/exercises", data)
    }

    const fetchSeries = async () => {
        const { data: series } = await axios.get("/api/series")

        setSeriesOptions(series.map((s: any) => ({ label: s.Name, value: s.id})))
    } 

    useEffect(() => {
        fetchSeries()
    }, [])

    return (
        <div className="p-20 text-white flex flex-col gap-15">
            <h1 className="text-2xl">Crea Esercizio o serie</h1>
            <div className="flex flex-row">
                <form onSubmit={handleCreateExercise(onSubmitExercise)} className="flex flex-col w-1/2 gap-5 p-5">
                    <Controller
                        name="Name"
                        control={controlExerciseForm}
                        render={({ field }) =>
                            <Input placeholder="Nome" onChange={field.onChange} />
                        }
                    />
                    <Controller
                        name="Description"
                        control={controlExerciseForm}
                        render={({ field }) =>
                            <Input placeholder="Descrizione" onChange={field.onChange} />
                        }
                    />
                    <Controller
                        name="HorizontalAreas"
                        control={controlExerciseForm}
                        render={({ field }) =>
                            <Select
                                onChange={field.onChange}
                                placeholder="Seleziona linee orizzontali"
                                options={HORIZONTAL_LINES_OPTIONS}
                                defaultValues={[]}
                            />
                        }
                    />
                    <Controller
                        name="VerticalAreas"
                        control={controlExerciseForm}
                        render={({ field }) =>
                            <Select
                                onChange={field.onChange}
                                placeholder="Seleziona linee verticali"
                                options={VERTICAL_LINES_OPTIONS}
                                defaultValues={[]}
                            />
                        }
                    />
                    <Controller
                        name="Series"
                        control={controlExerciseForm}
                        render={({field}) => 
                            <Select
                                onChange={field.onChange}
                                placeholder="Seleziona serie"
                                options={seriesOptions}
                                defaultValues={[]}
                            />
                        }
                    />
                    <button type="submit" className="bg-teal-500 rounded p-3">Crea esercizio</button>
                </form>
                <form onSubmit={handleCreateSeries(onSubmitSeries)} className="flex flex-col w-1/2 gap-5 p-5">
                    <Controller
                        name={"Name"}
                        control={controlSeriesForm}
                        render={({ field }) =>
                            <Input placeholder="Nome serie" onChange={field.onChange} />
                        }
                    />
                    <Controller
                        name="TargetShape"
                        control={controlSeriesForm}
                        render={({ field }) =>
                            <Select
                                onChange={field.onChange}
                                placeholder="Seleziona tipo di target"
                                options={TARGET_OPTIONS}
                                defaultValues={""}
                            />
                        }
                    />
                    <Controller
                        name="TargetColor"
                        control={controlSeriesForm}
                        render={({ field }) =>
                            <Select
                                onChange={field.onChange}
                                placeholder="Seleziona colore target"
                                options={TARGET_COLOR_OPTIONS}
                                defaultValues={""}
                            />
                        }
                    />
                    <Controller
                        name="TargetSize"
                        control={controlSeriesForm}
                        render={({ field }) =>
                            <Select
                                onChange={field.onChange}
                                placeholder="Seleziona dimensione target"
                                options={TARGET_SIZE_OPTIONS}
                                defaultValues={""}
                            />
                        }
                    />
                    <Controller
                        name="LimitWithUnity"
                        control={controlSeriesForm}
                        render={({ field }) =>
                            <InputWithDropdown
                                onChange={field.onChange}
                                type={InputType.number}
                                defaultValues={[10, UnityType.Time]}
                                options={[{ label: "Colpiti", value: UnityType.TargetCount }, { label: "Secondi", value: UnityType.Time }]}
                            />
                        }
                    />

                    <div className="w-full flex flex-row justify-between gap-2">
                        <div className="flex flex-row self-center gap-2">
                            <input {...register("PreviewTargetEnabled")} type="checkbox" />
                            <label>Preview Target</label>
                        </div>
                        <div className="flex flex-row self-center gap-2">
                            <input {...register("FakeTargetsEnabled")} type="checkbox" />
                            <label>Fake Target</label>
                        </div>
                    </div>
                    <button type="submit" className="bg-teal-500 rounded p-3">Crea serie</button>
                </form>
            </div>
        </div>
    );
}

export default CreateExercisePage;
