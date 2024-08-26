// components/serverComponent.tsx
import { fetchCars } from "@utils";
import { getFuels, getYears } from "@/utils";
export default async function ServerComponent(searchParams: any) {
    try {
        const allCars = await fetchCars({
            manufacturer: searchParams?.manufacturer || "",
            year: searchParams?.year || 2022,
            fuel: searchParams?.fuel || "",
            limit: searchParams?.limit || 10,
            model: searchParams?.model || "",
        });
        const fuelsData = await getFuels();
        const yearsData = await getYears();

        return {
            allCars: allCars.data,
            fuels: fuelsData.data,
            yearsOfProduction: yearsData.data,
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            allCars: [],
            fuels: [],
            yearsOfProduction: [],
        };
    }
}

