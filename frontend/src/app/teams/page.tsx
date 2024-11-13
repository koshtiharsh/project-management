'use client'

import {  useGetTeamsQuery } from "@/state/api"
import { useAppSelector } from "../redux"
import Header from "@/(components)/Header"
import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from "@mui/x-data-grid"

import { dataGridClassNames, dataGridSxStyles } from "../lib/utils"

const CustomToolbar = () => (
    <GridToolbarContainer className="toolbar flex gap-2" >
        <GridToolbarFilterButton />
        <GridToolbarExport />
    </GridToolbarContainer>
)

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "teamName", headerName: "Team Name", width: 150 },

    { field: "productOwnerUserName", headerName: "product Owner", width: 100 },
    { field: "projectManagerUsername", headerName: "project Manager", width: 100 },

]




export default function Page() {

    const { data: teams, isLoading, isError } = useGetTeamsQuery()

    const isDarkMode = useAppSelector((state) => state.global.isDarkMode)

    if (isLoading) return <div>Loading...</div>
    if (isError || !teams) return <div>Error while fetching users</div>
    return (
        <div className="flex w-full flex-col p-8 ">
            <Header name="Teams" />
            <div style={{ height: 650, width: '100%' }}>
                <DataGrid
                    rows={teams || []}
                    columns={columns}
                    getRowId={(row) => row.id}
                    pagination
                    className={dataGridClassNames}
                    sx={dataGridSxStyles(isDarkMode)}
                    slots={{
                        toolbar: CustomToolbar
                    }}
                />
            </div>
        </div>
    )
};