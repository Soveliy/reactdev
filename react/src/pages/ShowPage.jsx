import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getShowById } from "../api/api";
function ShowPage() {
  const { id } = useParams();

  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    async function loadShow() {
      setLoading(true);
      setError("");
      setShow(null);

      try {
        const data = await getShowById(id, controller.signal);
        if (!controller.signal.aborted) {
          setShow(data);
          setTimeout(() => {
            console.log(show);
          }, 2000);
        }
      } catch (error) {
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }
    loadShow();

    return () => {
      controller.abort();
    };
  }, [id]);
  if (loading) {
    return <b>Загрузка сериала</b>;
  }
  if (!show) {
    return <b>Сериал не найден</b>;
  }
  return (
    <div>
      <img src={show.image.original} alt="" />
      <h1>{show.name}</h1>;
    </div>
  );
}
export default ShowPage;
