import { Chart1 } from "@/components/features/charts/chart-1"
import { Chart2 } from "@/components/features/charts/chart-2"
import { Chart3 } from "@/components/features/charts/chart-3"
import { Chart4 } from "@/components/features/charts/chart-4"

const page = () => {
    return (
        <div>
            <div className="grid grid-cols-3 gap-8">
                <Chart1 />
                <Chart2 />
                <Chart3 />
                <Chart4 />
            </div>
        </div>
    )
}

export default page