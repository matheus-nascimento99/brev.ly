/** biome-ignore-all lint/correctness/useUniqueElementIds: not necessary */
export const NewLinkForm = () => {
  return (
    <form className="bg-white p-6 rounded-lg space-y-5">
      <fieldset>
        <legend className="text-lg text-gray-600">Novo link</legend>

        <div>
          <div>
            <label
              className="text-xs uppercase text-gray-500"
              htmlFor="original_link"
            >
              Link original
            </label>
            <input
              type="text"
              placeholder="www.exemplo.com.br"
              id="original_link"
            />
          </div>

          <div>
            <label
              className="text-xs uppercase text-gray-500"
              htmlFor="short_link"
            >
              Link encurtado
            </label>
            <input type="text" id="short_link" />
          </div>
        </div>

        <button type="submit">Submit</button>
      </fieldset>
    </form>
  )
}
