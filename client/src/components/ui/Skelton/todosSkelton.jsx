import Skeleton from "@mui/material/Skeleton";

export default function SkeletonTodoItem() {
  return (
    <li className="flex py-4 px-2 bg-gray-50/50 rounded-lg mb-2 shadow cursor-pointer hover:bg-gray-100 transition-all duration-300">
      <span className="cursor-grab">
        <Skeleton
          variant="rectangular"
          className="rounded"
          width={20}
          height={24}
          animation="wave"
        />
      </span>
      <span className="px-2">
        <Skeleton
          variant="rectangular"
          className="rounded-md"
          width={24}
          height={24}
          animation="wave"
        />
      </span>
      <h3 className="font-bold px-4 flex-1">
        <Skeleton variant="text" width="80%" height={24} animation="wave" />
      </h3>
    </li>
  );
}
