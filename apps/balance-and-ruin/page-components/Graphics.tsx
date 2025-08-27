import {
  CharacterSprites,
  type CharacterSpritesProps,
} from "~/card-components/CharacterSprites";
import { PageContainer } from "~/components/PageContainer/PageContainer";
import useSWR from "swr";
import { SpritePalettes } from "~/card-components/SpritePalettes";
import { OtherSprites } from "~/card-components/OtherSprites";
import { AccessibilityCard } from "~/card-components/AccessibilityCard";
import { readSetting, writeSetting } from "~/utils/localStorageUtils";
import { useState } from "react";
import { SettingSwitch } from "~/components/SettingSwitch/SettingSwitch";
import {
  GraphicsSettings,
  GraphicsSettingData,
} from "~/card-components/GraphicsSettings";

export const Graphics = () => {
  const { data } = useSWR<CharacterSpritesProps>(["/api/sprites"], async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/sprites`
    );
    const result = await response.json();
    return result as CharacterSpritesProps;
  });

  const { palettes = [], portraits = [], sprites = [] } = data || {};

  const getRandomizedPaletteValue = () => {
    return readSetting("useRandomizedPalette");
  };

  const setRandomizedPaletteValue = () => {
    let newFlagValue = !useRandomizedPalette;
    writeSetting("useRandomizedPalette", newFlagValue.toString());
    setUseRandomizedPalette(newFlagValue);
  };

  const [useRandomizedPalette, setUseRandomizedPalette] = useState(
    getRandomizedPaletteValue() === "true"
  );

  return (
    <>
      <PageContainer columns={1}>
        <span className="inline-flex gap-2 flex-wrap">
          <SettingSwitch
            isChecked={useRandomizedPalette}
            onClick={() => setRandomizedPaletteValue()}
            label="Use randomized palettes"
          />
        </span>
        {/* <GraphicsSettings graphicsSettingsData={[GraphicsSettingsData()]} /> */}
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
