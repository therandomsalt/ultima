import { Card } from "@ff6wc/ui";
import React, { useState } from "react";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { SettingSwitch } from "~/components/SettingSwitch/SettingSwitch";
import { readSetting, writeSetting } from "~/utils/localStorageUtils";

export type GraphicsSettingsProps = {
  graphicsSettingsData: Array<GraphicsSettingData>;
};

export type GraphicsSettingData = {
  isSettingEnabled: boolean;
  settingOnClick: () => {};
  settingLabel: string;
};

export const GraphicsSettings = ({
  graphicsSettingsData,
}: GraphicsSettingsProps) => {
  const settingSwitches: React.ReactNode[] = [];

  graphicsSettingsData.map((data) =>
    settingSwitches.push(
      <SettingSwitch
        isChecked={data.isSettingEnabled}
        onClick={() => data.settingOnClick}
        label={data.settingLabel}
      />
    )
  );

  return (
    <Card title={"Graphics settings"}>
      <span className="inline-flex gap-2 flex-wrap">{settingSwitches}</span>
    </Card>
  );
};
