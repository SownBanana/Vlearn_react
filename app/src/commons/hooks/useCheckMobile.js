import { useMediaQuery } from "@material-ui/core";

export default function useCheckMobile() {
    const isMobile = useMediaQuery("(max-width: 760px)");
    return isMobile
}
