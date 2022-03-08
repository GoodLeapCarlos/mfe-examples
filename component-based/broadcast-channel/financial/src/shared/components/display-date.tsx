export default function DisplayDate() {
    let date = new Date().toISOString();

    return (
        <div className="border-4 border-blue-300">
        <div className="text-sm font-medium">Financial App - DisplayDate</div>
                { date }
        </div>
    )
}