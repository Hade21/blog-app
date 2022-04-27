import styles from "../../styles/Home.module.css";
import { getCategory, createCategory } from "../../lib/auth";
import { useEffect, useState } from "react";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CardWrapper() {
  const [newCategory, setNewCategory] = useState();
  const res = getCategory();
  const [category, setCategory] = useState([]);
  const [status, setStatus] = useState(0);

  const assign = async () => {
    await res.then((res) => {
      setCategory(res.data.success);
      setStatus(res.status);
    });
  };

  useEffect(() => {
    assign();
  }, []);

  const handleChange = (event) => {
    setNewCategory(event.target.value);
    console.log(newCategory);
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      const { success } = await createCategory({ name: newCategory });
      if (success) {
        assign();
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="wrapper">
      <p className={styles.description}>Categories</p>
      <div className={styles.grid}>
        {status == 200 ? (
          category.map((item) => {
            return (
              <div key={item.id} className={styles.card}>
                <h2 className="font-Commisioner font-bold text-xl">
                  {item.name}
                </h2>
                <p
                  className="font-Commisioner font-normal text-base
                "
                >
                  Description
                </p>
              </div>
            );
          })
        ) : (
          <h2>No Category Listed</h2>
        )}
      </div>
      <form
        className="add_category flex flex-col gap-4 mt-10 items-center"
        onSubmit={handleCreate}
      >
        <input
          type="text"
          name="name"
          id="text"
          placeholder="Add Category"
          className="px-6 py-3 outline-none bg-slate-100 rounded-md focus:outline-none focus:bg-slate-200 w-1/2 text-lg"
          onChange={handleChange}
        />
        <button className="px-8 py-2 bg-slate-100 rounded-2xl shadow-lg shadow-slate-200 flex gap-3 items-center hover:bg-slate-50 hover:border-2 hover:border-slate-400 hover:text-slate-600">
          <h3 className="font-Commisioner font-medium text-lg text-center ">
            Add Category
          </h3>
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      </form>
    </div>
  );
}

// export async function getServerSideProps() {
//   const result = axios.get(
//     "http://endpont-blog.ninedragonlabs.com/api/get_category"
//   );
//   const [data] = await Promise.all([result]);
//   return {
//     props: {
//       category: data.data.success,
//     },
//   };
// }
