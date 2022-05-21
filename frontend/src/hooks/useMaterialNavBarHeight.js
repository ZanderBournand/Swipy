import { useSafeAreaInsets } from 'react-native-safe-area-context'

const useMaterialNavBarHeight = (withoutBottomTabs, notch) => {
    const { bottom, top } = useSafeAreaInsets();
    return (withoutBottomTabs ? 0 : bottom) + (withoutBottomTabs ? 0 : 54)
}

export default useMaterialNavBarHeight