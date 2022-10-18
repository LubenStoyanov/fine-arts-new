import React from "react";
import { useLoaderData } from "react-router-dom";
import contentful from "../data/contentful";
import search from "../search";

export async function loader({ request }) {
  let url = new URL(request.url);
  let searchTerm = url.searchParams.get("query");

  const { getBooks, getArt, getMusic } = contentful();

  const art = await getArt();
  const music = await getMusic();
  const books = await getBooks();

  const works = search(searchTerm, art, books, music);
  return { works };
}

export default function Works() {
  const { works } = useLoaderData();

  const mappedWorks = works.map((work) => (
    <div key={work.sys.id}>
      <label className="swap swap-flip text-9xl">
        <input type="checkbox" />
        <div className="swap-on">
          <div className="card card-compact w-60 sm:w-full sm:h-full bg-base-100 shadow-xl">
            😈
          </div>
        </div>
        <div className="card card-compact w-60 sm:w-max sm:h-max bg-base-100 shadow-xl swap-off">
          <figure>
            <img
              className=""
              src={
                work.fields.artworks
                  ? work.fields.artworks[0].fields.file.url
                  : work.fields.cover.fields.file.url
              }
              alt={`Book cover of ${work.fields.title} by ${
                work.fields.artist ? work.fields.artist : work.fields.author
              }`}
            />
          </figure>
        </div>
      </label>
    </div>
  ));

  return (
    <div className="flex flex-col items-center ">
      <div className="container prose h1 my-10">
        <h1 style={{ textAlign: "center" }}>Works</h1>
      </div>
      <div className="flex flex-col sm:flex-row sm:flex-wrap space-y-10 space-x-5">
        <div></div>
        {mappedWorks}
      </div>
    </div>
  );
}
