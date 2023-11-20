import { useState } from "react"
import "./App.css"
import axios from "axios"
import { useEffect } from "react"

function App() {
  const [data, setData] = useState("")
  const [initializeData, setInitializeData] = useState(false)
  const [singleItem, setSingleItem] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          "https://api.huuto.net/1.1/categories/1/items"
        )
        setData(result.data)
        console.log(result.data.items)
        setInitializeData(true)
      } catch (err) {
        console.log("ERROR:", err)
      }
    }
    fetchData()
  }, [])

  const linkHandler = async (link) => {
    try {
      const result = await axios.get(link)
      setSingleItem(result.data)
      console.log(result.data)
      setInitializeData(true)
    } catch (err) {
      console.log("ERROR:", err)
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {initializeData ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            cursor: "pointer",
          }}
        >
          {data.items.map((item, index) => (
            <div onClick={() => linkHandler(item.links.self)}>{item.title}</div>
          ))}
        </div>
      ) : (
        <p>Haetaan dataa...</p>
      )}
      {singleItem && (
        <div>
          {singleItem.images[0] && (
            <img src={singleItem.images[0].links.thumbnail} />
          )}
        </div>
      )}
    </div>
  )
}

export default App
