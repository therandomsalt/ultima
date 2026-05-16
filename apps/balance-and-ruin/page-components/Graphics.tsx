import {
  CharacterSprites,
  type CharacterSpritesProps,
} from "~/card-components/CharacterSprites";
import { PageContainer } from "~/components/PageContainer/PageContainer";
import useSWR from "swr";
import { SpritePalettes } from "~/card-components/SpritePalettes";
import { OtherSprites } from "~/card-components/OtherSprites";
import { AccessibilityCard } from "~/card-components/AccessibilityCard";
// import { readSetting, writeSetting } from "~/utils/localStorageUtils";
import { useState } from "react";
import {
  GraphicsSettings,
  GraphicsSettingData,
} from "~/card-components/GraphicsSettings";
import {
  graphicsSettingsData,
  useRandomizedPalette,
} from "~/utils/settingsSetup";

export const Graphics = () => {
  const { data } = useSWR<CharacterSpritesProps>(["/api/sprites"], async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/sprites`
    );
    const result = await response.json();
    return result as CharacterSpritesProps;
  });

  const { palettes = [], portraits = [], sprites = [] } = data || {};

  // const getRandomizedPaletteValue = () => {
  //   return readSetting("useRandomizedPalette");
  // };

  // const setRandomizedPaletteValue = () => {
  //   let newFlagValue = !useRandomizedPalette;
  //   writeSetting("useRandomizedPalette", newFlagValue.toString());
  //   setUseRandomizedPalette(newFlagValue);
  // };

  // const [useRandomizedPalette, setUseRandomizedPalette] = useState(
  //   getRandomizedPaletteValue() === "true"
  // );

  // function createNewGraphicsSettingsData(
  //   label: string,
  //   isEnabled: boolean,
  //   onClick: () => void
  // ): GraphicsSettingData {
  //   console.log(useRandomizedPalette);
  //   return {
  //     isSettingEnabled: isEnabled,
  //     settingLabel: label,
  //     settingOnClick: onClick,
  //   };
  // }

  // function graphicsSettingsData(): GraphicsSettingData[] {
  //   return [
  //     createNewGraphicsSettingsData(
  //       "Use randomized palettes",
  //       useRandomizedPalette,
  //       setRandomizedPaletteValue
  //     ),
  //     createNewGraphicsSettingsData(
  //       "There is no spoon",
  //       useRandomizedPalette,
  //       setRandomizedPaletteValue
  //     ),
  //   ];
  // }

  return (
    <>
      <PageContainer columns={1}>
        <GraphicsSettings graphicsSettingsData={graphicsSettingsData()} />
      </PageContainer>
      {!useRandomizedPalette ? (
        <>
          <PageContainer columns={2}>
            <SpritePalettes palettes={palettes} />
            <OtherSprites
              palettes={palettes}
              portraits={portraits}
              sprites={sprites}
            />

            <CharacterSprites
              palettes={palettes}
              portraits={portraits}
              sprites={sprites}
            />
          </PageContainer>
          <PageContainer columns={1}>
            <AccessibilityCard />
          </PageContainer>
        </>
      ) : null}
    </>
  );
};
