import { useRegionStore } from "@/store/regionStore";

function BreadCrambs() {
  const { selectedRegions } = useRegionStore();

  return (
    <div>
      <ul className="list-disc ml-6 mt-2 mb-8">
        {selectedRegions.map((regionId) => (
          <li key={regionId}>{regionId}</li>
        ))}
      </ul>
    </div>
  );
}

export default BreadCrambs;
