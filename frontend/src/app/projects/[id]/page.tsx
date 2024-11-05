'use client';
import { useState } from "react";
import ProjectHeader from '../projectHeader';
import BoardView from "../boardview";

import ListView from "../List";
import Timeline from "../TimelineView";
import TableView from "../TableView";
import ModelNewTask from "@/(components)/ModalNewTask";


type Props = {
  params: { id: string }

}

interface newint {
  ksdjf: number;
  str: string;
}
export default function Project({ params }: Props) {
  const { id } = params;

  const [activeTab, setActiveTab] = useState<string>('Board');
  const [isModelNewTaskOpen, setIsModelNewTaskOpen] = useState(false);

  return (
    <>
      <ModelNewTask

        isOpen={isModelNewTaskOpen}
        onClose={() => setIsModelNewTaskOpen(false)}
        id={id}

      />
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "Board" && ( // Fixed the typo here
        <BoardView id={id} setIsModalNewTaskOpen={setIsModelNewTaskOpen} />
      )}
      {activeTab === "List" && ( // Fixed the typo here
        <ListView id={id} setIsModalNewTaskOpen={setIsModelNewTaskOpen} />
      )}
      {activeTab === "Timeline" && ( // Fixed the typo here
        <Timeline id={id} setIsModalNewTaskOpen={setIsModelNewTaskOpen} />
      )}
      {activeTab === "Table" && ( // Fixed the typo here
        <TableView id={id} setIsModalNewTaskOpen={setIsModelNewTaskOpen} />
      )}
    </>
  );
};
