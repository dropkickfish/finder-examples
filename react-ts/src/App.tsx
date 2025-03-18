import { create, OpeningOptions, FrontifyAsset } from '@frontify/frontify-finder'
import { useState } from 'react'

type Tag = {
  value: string
  source: string
}

type MetadataValue = {
  value: string | number
  metadataField: {
    id: string
    label: string
  }
}
function App() {
  const [assets, setAssets] = useState<FrontifyAsset[]>([])
  const [isFinderOpen, setIsFinderOpen] = useState(false)

  const config: OpeningOptions = {
    clientId: 'client-id',
    options: {
      allowMultiSelect: false
    }
  }

  const handleButtonClick = async () => {
    setIsFinderOpen(true)
    const finder = await create(config)
    finder.mount(document.getElementById('finder-container') as HTMLElement)
    finder.onAssetsChosen((assets: FrontifyAsset[]) => {
      console.log('assets', assets)
      setAssets(assets)
    })
  }

  return (
    <>
    <div className="flex flex-col w-full h-screen border border-black bg-white">
      <div className="grid grid-cols-1 md:grid-cols-3 h-full">
        <div className="flex flex-col border-r border-gray-300 h-full">
          <div className="p-6 border-b border-gray-300 bg-gray-100">
            <h1 className="text-lg font-bold uppercase">Frontify Finder</h1>
            <p className="text-sm mb-4">React Typescript Example</p>

            <button disabled={isFinderOpen} className="w-full bg-black text-white py-2 px-4 mb-4 uppercase rounded-sm" onClick={handleButtonClick}>Open Finder</button>

            <p className="text-sm">
              A simple example of how to use the Frontify Finder in a React Typescript application.
              <br />
              <br />
              The finder is mounted in the right column and the selected asset will be displayed in the left column alongside the asset details using the <code>onAssetsChosen</code> event.
              <br />
              <br />
              Documentation can be found <a href="https://developer.frontify.com/d/xJoA5nhTq1AT/finder#/general/frontify-finder" target="_blank" rel="noopener noreferrer">on the Frontify Developer Portal</a>.
              <br />
              <br />
              The Finder GitHub repository can be found <a href="https://github.com/Frontify/frontify-finder" target="_blank" rel="noopener noreferrer">here</a>.
              <br />
              <br />
              The npm package can be found <a href="https://www.npmjs.com/package/@frontify/frontify-finder" target="_blank" rel="noopener noreferrer">here</a>.
            </p>
          </div>

          <div className="flex-grow bg-gray-100 overflow-y-auto p-4 h-0 min-h-0">
            {assets.map((asset) => (
              <div key={asset.id} className="mb-6 p-4 bg-white rounded shadow">
                <img src={asset.previewUrl} alt={asset.title} className="w-full mb-4 rounded"/>
                <h2 className="text-xl font-bold mb-2">Title: {asset.title}</h2>
                <p className="mb-1">Description: {asset.description}</p>
                <p className="mb-1">Type: {asset.type}</p>
                <p className="mb-1">Extension: {asset.extension}</p>
                <p className="mb-1">Author: {asset.author}</p>
                <p className="mb-1">Creator: {asset.creator.name}</p>
                <p className="mb-1">Created At: {asset.createdAt}</p>
                <p className="mb-1">Expires At: {asset.expiresAt}</p>
                <p className="mb-1">Copyright: {asset.copyright.status} - {asset.copyright.notice}</p>
                <p className="mb-1">Tags: 
                  <span className="flex flex-wrap gap-1 mt-1">
                    {asset.tags.map((tag: Tag) => (
                      <span key={tag.value} className="px-2 py-1 bg-gray-200 text-gray-800 text-xs rounded-full">
                        {tag.value}
                      </span>
                    ))}
                  </span>
                </p>
                
                <div className="mb-3">
                  <p className="mb-1 font-medium">Metadata:</p>
                  {asset.metadataValues.length > 0 ? (
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="text-left p-2 border border-gray-200">Metadata field</th>
                          <th className="text-left p-2 border border-gray-200">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {asset.metadataValues.map((metadata: MetadataValue) => (
                          <tr key={metadata.metadataField.id} className="border-b border-gray-200">
                            <td className="p-2 border border-gray-200">{metadata.metadataField.label}</td>
                            <td className="p-2 border border-gray-200">{metadata.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-sm text-gray-500 italic">No metadata available</p>
                  )}
                </div>
                
                <p className="mb-1">Download URL: <a href={asset.downloadUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Link to asset download</a></p>
                <p className="mb-1">Preview URL: <a href={asset.previewUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Link to asset preview</a></p>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-2 h-full flex items-center justify-center" id="finder-container">
          {/* Empty right column - will be populated with the finder */}
        </div>
      </div>
    </div>
    </>
  )
}

export default App
