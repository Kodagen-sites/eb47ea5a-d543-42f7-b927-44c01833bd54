import { siteConfig } from "@/content/site-config";

import HeaderPillFloating from "./headers/HeaderPillFloating";
import HeaderSplitEdges from "./headers/HeaderSplitEdges";
import HeaderMacBookFrame from "./headers/HeaderMacBookFrame";
import HeaderTransparentGhost from "./headers/HeaderTransparentGhost";
import HeaderFullscreenOverlay from "./headers/HeaderFullscreenOverlay";
import HeaderBottomDock from "./headers/HeaderBottomDock";
import HeaderBurgerOnly from "./headers/HeaderBurgerOnly";
import HeaderGlassPlasma from "./headers/HeaderGlassPlasma";
import HeaderCenterLogoSplit from "./headers/HeaderCenterLogoSplit";
import HeaderCommandBar from "./headers/HeaderCommandBar";

export const HEADER_VARIANTS = {
  "pill-floating":       HeaderPillFloating,
  "split-edges":         HeaderSplitEdges,
  "macbook-frame":       HeaderMacBookFrame,
  "transparent-ghost":   HeaderTransparentGhost,
  "fullscreen-overlay":  HeaderFullscreenOverlay,
  "bottom-dock":         HeaderBottomDock,
  "burger-only":         HeaderBurgerOnly,
  "glass-plasma":        HeaderGlassPlasma,
  "center-logo-split":   HeaderCenterLogoSplit,
  "command-bar":         HeaderCommandBar,
} as const;

export type HeaderVariantId = keyof typeof HEADER_VARIANTS;

export default function Header() {
  const variant =
    (siteConfig as any).headerVariant as HeaderVariantId | undefined;

  const Component = (variant && HEADER_VARIANTS[variant]) || HeaderPillFloating;

  return <Component />;
}
