import { ChangeEvent } from "react";

export const UploadForm = ({
  handleInputChange,
}: {
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <form className="bg-white border border-gray-200 p-4 rounded-mg shadow-sm">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 cursor-default">
            My Expenses
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6"
              >
                Expenses Excel
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed dark:border-gray-200/25 border-gray-800/25 px-6 py-10">
                <div className="text-center">
                  <div className="mt-4 flex text-sm leading-6 dark:text-gray-200 text-gray-700">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold px-2 text-gray-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-gray-600 focus-within:ring-offset-2 hover:text-gray-800"
                    >
                      <span>Upload a file</span>
                      <input
                        type="file"
                        id="file-upload"
                        name="file-upload"
                        className="sr-only"
                        accept=".xlsx, .xls, .csv"
                        onChange={handleInputChange}
                      />
                    </label>
                    <p className="pl-1 cursor-default">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 dark:text-gray-200 text-gray-600 cursor-default">
                    XML, CSV up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
        >
          Save
        </button>
      </div>
    </form>
  );
};
