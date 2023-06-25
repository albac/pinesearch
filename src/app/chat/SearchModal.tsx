"use client";

import { useState } from "react";
import SearchModalFooter from "./SearchModalFooter";
import SearchResult from "./SearchResult";
import Selection from "./SearchSelection";
import PulseLoader from "react-spinners/PulseLoader";
import { Amplify } from "aws-amplify";
import awsconfig from "../../aws-exports";

Amplify.configure(awsconfig);

/*
    Default search choices for the user.
*/
const defaultSelections = [
  "What does the future of quantum computing look like?",
  "What is the nature of consciousness, and how does it arise in the brain?",
  "What are the cultural, and psychological factors that influence human behavior?"
];

interface ISearchModalProps {
  closeModal: () => void;
}

export default function SearchModal({ closeModal }: ISearchModalProps) {
  const [query, setQuery] = useState("");
  const [queries, setQueries] = useState<Array<string>>([]);
  const [resultString, setResultString] = useState<string | null>(null);
  const [resultArray, setResultArray] = useState<Array<{ source: string; text: string }> | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  /*
        Update the search state
        @param result - the answer to the query from pinecone
        @param currentQuery -  the current query of the user
    */

  const updateSearchState = (
    result: { resultString: string; resultArray: Array<{ source: string; text: string }> },
    currentQuery: string
  ) => {
    const { resultString, resultArray } = result;

    console.log("Result type: ", typeof result);
    console.log("Result: ", result);
    console.log("Result String: ", resultString);
    console.log("Result Array: ", resultArray);

    if (resultString) {
      setResultString(resultString);
    }

    if (resultArray) {
      setResultArray(resultArray);
    }

    const updatedQueries = [...queries, currentQuery];
    setQueries(updatedQueries);
    setQuery("");
    setIsLoading(false);
  };

  /*
        Submit a search to pinecone. A user can either enter a query
        or choose one of the example searches. If they click on an example 
        search the text will be passed to onSubmitSearch.

        @param text - optional - the query when a user has clicked on
        an example search.
    */

  const getResponse = async (text: string) => {
    try {
      setIsLoading(true);

      // Make sure text isn't being set as e (synthetic event)
      const isExampleQuery = text && typeof text === "string";

      if (isExampleQuery) {
        setQuery(text);
      }

      const response = await fetch(`/api/read`, {
        method: "POST",
        body: JSON.stringify({ question: isExampleQuery ? text : query })
      });

      const result = await response.json();
      let { resultString, resultArray } = result.data;

      const uniqueItems: { [key: string]: boolean } = {};
      const uniqueResultArray = resultArray.reduce((acc: any[], item: any) => {
        const { source } = item;
        if (!uniqueItems[source]) {
          uniqueItems[source] = true;
          acc.push(item);
        }
        return acc;
      }, []);

      updateSearchState(
        { resultString, resultArray: uniqueResultArray },
        isExampleQuery ? text : query
      );
    } catch (e) {
      setIsLoading(false);
      const typedError = e as Error;
      console.log("Error submitting search - ", typedError.message);
    }
  };

  const onSubmitSearch = async (e?: React.FormEvent, text?: string) => {
    e?.preventDefault();

    await getResponse(text ?? "");
  };

  const onSubmitSelect = async (text?: string) => {
    await getResponse(text ?? "");
  };

  const searchInit = (
    <>
      <h1 className="mt-24 font-bold text-2xl mb-8">Examples</h1>
      {defaultSelections.map((selectionText, index) => (
        <Selection key={index} text={selectionText} onSubmitSearch={onSubmitSelect} />
      ))}
    </>
  );

  const searchResult = (
    <SearchResult queries={queries} resultString={resultString} resultArray={resultArray} />
  );

  // determine which component to display
  // if we're loading display spinner.

  let loadedComponent = null;

  if (!isLoading) {
    loadedComponent = !resultString && !resultArray ? searchInit : searchResult;
  }

  return (
    <div
      className="h-full w-full bg-slate-600 bg-opacity-50 z-10 absolute top-0 left-0 flex flex-col justify-center items-center"
      onClick={closeModal}
    >
      <div
        className="h-3/4 w-10/12 lg:w-2/3 bg-white rounded-3xl bg-opacity-100 z-20 flex flex-col items-center relative overflow-scroll"
        /** this is kind of a hacky way to handle this click, but I don't want to waste a bunch of time making the backdrop a
         * a sibling element instead of a parent element.
         */
        onClick={(e) => e.stopPropagation()}
      >
        {loadedComponent}
        {isLoading && (
          <div className="h-full w-full flex justify-center items-center">
            <PulseLoader />
          </div>
        )}
        <SearchModalFooter onSubmitSearch={onSubmitSearch} query={query} setQuery={setQuery} />
      </div>
    </div>
  );
}
