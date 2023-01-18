import { useAppSelector } from "app/store";

export default function usePocket(id) {
   
    return {
        pocket: useAppSelector((state) => state.game).pockets[id],
    };
}
