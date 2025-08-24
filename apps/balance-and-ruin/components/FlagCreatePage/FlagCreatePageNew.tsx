import { TabLabel } from "@ff6wc/ui";
import { Tab } from "@headlessui/react";
import { cx } from "cva";
import Head from "next/head";
import React, { useEffect, useMemo, useState } from "react";
import type { IconType } from "react-icons";
import { GiPaintBrush } from "react-icons/gi";
import { FiEdit2 } from "react-icons/fi";
import { HiCog } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { AppHeader } from "~/components/AppHeader/AppHeader";
import { CardColumn } from "~/components/CardColumn/CardColumn";
import { Footer } from "~/components/Footer/Footer";
import { GenerateCard } from "~/components/GenerateCard/GenerateCard";
import { PageContainer } from "~/components/PageContainer/PageContainer";
import { Graphics } from "~/page-components/Graphics";
import { Settings } from "~/page-components/Settings";
import { setObjectiveMetadata } from "~/state/objectiveSlice";
import { RawFlagMetadata, setSchema } from "~/state/schemaSlice";
import { ObjectiveMetadata } from "~/types/objectives";
import { FlagPreset } from "~/types/preset";
import { Stepper } from "~/components/Stepper/Stepper";
import { SeedSettings } from "~/components/SeedSettings/SeedSettings";

type PageProps = {
  objectives: ObjectiveMetadata;
  presets: Record<string, FlagPreset>;
  schema: Record<string, RawFlagMetadata>;
  version: string;
};

type TabItem = {
  className?: string;
  content: React.ReactNode;
  label: React.ReactNode;
  id: string;
};

type WithChildren = { children: React.ReactNode; className?: string };
const TabContainer = ({ children, className }: WithChildren) => {
  return (
    <div
      className={cx(
        "flex items-center gap-2",
        "py-1 md:py-2 lg:py-3",
        "px-2 md:px-3",
        className
      )}
    >
      {children}
    </div>
  );
};

type WithIcon = {
  className?: string;
  Icon: IconType;
};
const TabIcon = ({ className, Icon }: WithIcon) => {
  return (
    <>
      <Icon className={className} size={"1.25rem"} />
    </>
  );
};

export const FlagCreatePage = ({
  objectives,
  presets,
  schema,
  version,
}: PageProps) => {
  const tabs: TabItem[] = useMemo(
    () =>
      [
        {
          label: (
            <TabContainer>
              <TabIcon Icon={FiEdit2} />
              Initial setup
            </TabContainer>
          ),

          id: "initialsetup",
          content: <Settings presetList={presets} />,
        },
        {
          label: (
            <TabContainer>
              <TabIcon Icon={HiCog} />
              Settings
            </TabContainer>
          ),

          id: "settings",
          content: <SeedSettings />,
        },
        {
          label: (
            <TabContainer>
              <TabIcon Icon={GiPaintBrush} />
              Graphics
            </TabContainer>
          ),

          id: "graphics",
          content: <Graphics />,
        },
      ].filter((z) => !!z) as TabItem[],
    [presets]
  );
  const dispatch = useDispatch();

  const [currentStep, setCurrentStep] = React.useState(0);
  const MAX_STEPS = tabs.length;

  const goToNextStep = () =>
    setCurrentStep((prev) => (prev === MAX_STEPS - 1 ? prev : prev + 1));
  const goToPreviousStep = () =>
    setCurrentStep((prev) => (prev <= 0 ? prev : prev - 1));

  useEffect(() => {
    dispatch(setSchema(schema));
    dispatch(setObjectiveMetadata(objectives));
  }, [dispatch, objectives, schema]);

  return (
    <>
      <Head>
        <title>FF6WC</title>
        <meta
          name="description"
          content="Final Fantasy VI open-world randomizer"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppHeader />
      <main className="WC-Page WC-page">
        <div className="flex justify-center items-center py-4">
          Version: {version}
        </div>

        <Stepper
          currentStep={currentStep}
          numberOfSteps={MAX_STEPS}
          previousButtonClicked={goToPreviousStep}
          nextButtonClicked={goToNextStep}
        />

        <Tab.Group manual selectedIndex={currentStep}>
          <div className="flex justify-center items-center py-4">
            <Tab.List className="md:grid-cols-3">
              {tabs.map((tab) => (
                <TabLabel
                  className={tab.className}
                  key={tab.id}
                  selected={
                    tabs[currentStep] ? tabs[currentStep].id === tab.id : false
                  }
                >
                  {tab.label}
                </TabLabel>
              ))}
            </Tab.List>
          </div>
          <Tab.Panels tabIndex={currentStep}>
            {tabs.map(({ content, id }) => (
              <Tab.Panel tabIndex={currentStep} key={`tab-panel-${id}`}>
                {content}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </main>

      <PageContainer className={"w-full"}>
        <CardColumn>
          <GenerateCard />
        </CardColumn>
      </PageContainer>
      <Footer />
    </>
  );
};
