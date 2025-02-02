/*!
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { useParams } from "react-router-dom";

import {
  useDagServiceGetDagDetails,
  useDagsServiceRecentDagRuns,
} from "openapi/queries";
import { DetailsLayout } from "src/layouts/Details/DetailsLayout";

import { Header } from "./Header";

const tabs = [
  { label: "Overview", value: "" },
  { label: "Runs", value: "runs" },
  { label: "Tasks", value: "tasks" },
  { label: "Events", value: "events" },
  { label: "Code", value: "code" },
];

export const Dag = () => {
  const { dagId = "" } = useParams();

  const {
    data: dag,
    error,
    isLoading,
  } = useDagServiceGetDagDetails({
    dagId,
  });

  // TODO: replace with with a list dag runs by dag id request
  const {
    data: runsData,
    error: runsError,
    isLoading: isLoadingRuns,
  } = useDagsServiceRecentDagRuns({ dagIds: [dagId] }, undefined, {
    enabled: Boolean(dagId),
  });

  const runs =
    runsData?.dags.find((dagWithRuns) => dagWithRuns.dag_id === dagId)
      ?.latest_dag_runs ?? [];

  return (
    <DetailsLayout
      dag={dag}
      error={error ?? runsError}
      isLoading={isLoading || isLoadingRuns}
      tabs={tabs}
    >
      <Header dag={dag} dagId={dagId} latestRun={runs[0]} />
    </DetailsLayout>
  );
};
