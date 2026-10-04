"use client";

import { useMemo, useState } from "react";

import AppointmentCard from "./AppointmentCard";
import AppointmentFilters from "./AppointmentFilters";
import SearchBar from "./SearchBar";

interface Cita {

  id:number;

  nombre:string;

  email:string;

  telefono:string;

  servicio:string;

  fecha:Date;

  estado:string;

  mensaje:string | null;

}

interface Props{

  citas:Cita[];

}

export default function CitasContent({

  citas,

}:Props){

  const [buscar,setBuscar]=useState("");

  const [filtro,setFiltro]=useState("Todas");

  const citasFiltradas=useMemo(()=>{

    return citas.filter((cita)=>{

      const coincideBusqueda=

      cita.nombre.toLowerCase().includes(buscar.toLowerCase())

      ||

      cita.email.toLowerCase().includes(buscar.toLowerCase())

      ||

      cita.telefono.includes(buscar);

      const coincideEstado=

      filtro==="Todas"

      ||

      cita.estado===filtro;

      return coincideBusqueda && coincideEstado;

    });

  },[buscar,filtro,citas]);

  return(

<div className="space-y-8">

<div>

<h1 className="text-4xl font-bold text-slate-900">

Gestión de citas

</h1>

<p className="mt-2 text-slate-600">

Administra todas las citas de la empresa.

</p>

</div>

<SearchBar

value={buscar}

onChange={setBuscar}

/>

<AppointmentFilters

filtro={filtro}

setFiltro={setFiltro}

/>

<div className="grid gap-6 md:grid-cols-2">

{citasFiltradas.map((cita)=>(

<AppointmentCard

key={cita.id}

cita={cita}

/>

))}

</div>

{citasFiltradas.length===0 &&(

<div className="rounded-xl bg-white p-12 text-center shadow">

<h2 className="text-2xl font-bold text-slate-800">

No se encontraron citas

</h2>

<p className="mt-2 text-slate-500">

Prueba otro filtro o búsqueda.

</p>

</div>

)}

</div>

  );

}