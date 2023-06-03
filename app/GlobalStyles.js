import * as StyleSheet from './utils/StyleSheet';

export const ActivityIndicatorStyles = (theme) =>
  StyleSheet.create({ 'Activity Indicator': { height: 36, width: 36 } });

export const ViewStyles = (theme) =>
  StyleSheet.create({
    AddaCard: { marginBottom: 18 },
    BakarrHeader: { marginBottom: 10 },
    'Before match': {
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      marginTop: 300,
    },
    'Layer-1': { marginTop: 10 },
    'Layer-2': {
      backgroundColor: theme.colors['Background'],
      flexDirection: 'column',
    },
    'Layer-4': { alignSelf: 'auto' },
    LiveAdda: { marginBottom: 18, marginTop: 18, paddingRight: 18 },
    'PF-BackHeader': { paddingBottom: 7, paddingTop: 7 },
    'PF-BackHeader 2': { paddingBottom: 7, paddingTop: 7 },
    'PF-BackHeader 3': { paddingBottom: 7, paddingTop: 7 },
    'PF-BackHeader 4': { paddingBottom: 7, paddingTop: 7 },
    'PF-BackHeader 5': { paddingBottom: 7, paddingTop: 7 },
    'PF-BackHeader 6': { paddingBottom: 7, paddingTop: 7 },
    'PF-BackHeader 7': { paddingBottom: 7, paddingTop: 7 },
    'PF-BackHeader 8': { paddingBottom: 7, paddingTop: 7 },
    'PF-Feed': { flex: 1 },
    'PF-Feed 2': { flex: 1 },
    'PF-Feed 3': { flex: 1 },
    'PF-Feed 4': { flex: 1 },
    'PF-GoBack': {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    'PF-GoBack 2': {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    'PF-GoBack 3': {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    'PF-HeaderFrame': { flexDirection: 'row' },
    'PF-HeaderFrame 2': { flexDirection: 'row', flexGrow: 0, flexShrink: 0 },
    'PF-HeaderFrame 3': { flexDirection: 'row', flexGrow: 0, flexShrink: 0 },
    'PF-MatchCard': {
      alignItems: 'center',
      borderColor: theme.colors['App Green'],
      borderLeftWidth: 1,
      borderRadius: 12,
      borderRightWidth: 1,
      height: 80,
      marginRight: 14,
      padding: 2,
      paddingTop: 2,
    },
  });

export const ButtonStyles = (theme) =>
  StyleSheet.create({
    Button: {
      borderRadius: 8,
      fontFamily: 'System',
      fontWeight: '700',
      textAlign: 'center',
    },
  });

export const CheckboxRowStyles = (theme) => StyleSheet.create({ 'Checkbox Row': { minHeight: 50 } });

export const DeckSwiperStyles = (theme) => StyleSheet.create({ 'Deck Swiper': { position: 'absolute' } });

export const DeckSwiperCardStyles = (theme) =>
  StyleSheet.create({
    'Deck Swiper Card': {
      alignItems: 'center',
      borderWidth: 2,
      justifyContent: 'center',
      padding: 20,
    },
  });

export const DividerStyles = (theme) => StyleSheet.create({ Divider: { height: 1 } });

export const FetchStyles = (theme) => StyleSheet.create({ Fetch: { minHeight: 40 } });

export const ImageStyles = (theme) => StyleSheet.create({});

export const ImageBackgroundStyles = (theme) => StyleSheet.create({});

export const ScrollViewStyles = (theme) =>
  StyleSheet.create({
    ImgScroll: { flexDirection: 'row', marginTop: 16, width: '100%' },
  });

export const FlatListStyles = (theme) => StyleSheet.create({ List: { flex: 1 } });

export const KeyboardAwareScrollViewStyles = (theme) => StyleSheet.create({ 'Match-Comments': { flexShrink: 2 } });

export const SurfaceStyles = (theme) => StyleSheet.create({});

export const SwiperStyles = (theme) => StyleSheet.create({ Swiper: { height: 300, width: '100%' } });

export const TabViewItemStyles = (theme) => StyleSheet.create({ 'Tab View Item': { flex: 1 } });

export const TableStyles = (theme) => StyleSheet.create({ Table: { flex: 1 } });

export const TextStyles = (theme) => StyleSheet.create({});

export const TextInputStyles = (theme) =>
  StyleSheet.create({
    'Text Input': {
      borderBottomWidth: 1,
      borderColor: theme.colors.divider,
      borderRadius: 8,
      paddingBottom: 8,
      paddingLeft: 8,
      paddingRight: 8,
      paddingTop: 8,
    },
  });

export const TouchableStyles = (theme) => StyleSheet.create({ imgAvatar: { marginLeft: 12 } });
