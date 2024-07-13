import Link from "next/link";

const ExercisesPage = () => {
    return (
        <div className="p-20 text-white flex flex-col gap-15">
            <h1 className="text-2xl">Exercises</h1>
            <Link href="/exercises/create">
                <button className="bg-white text-black p-3 rounded">Create</button>
            </Link>
        </div>
    )
}

export default ExercisesPage;
