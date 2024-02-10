//imports
import { createContext, useContext, useEffect, useState } from "react";
import { obtenerDatosPerfiles } from "../api/perfiles.api";
import axios from "../api/axios";
import { toast } from "react-toastify";
import { eliminarCategoria, obtenerCategorias } from "../api/categorias.api";
import { eliminarColor, obtenerColores } from "../api/colores.api";

//context
export const AluminioContext = createContext();

//use context
export const useAluminioContext = () => {
  const context = useContext(AluminioContext);
  if (!context) {
    throw new Error("use Auth propvider");
  }
  return context;
};

//provider
export const AluminioProvider = ({ children }) => {
  const [perfiles, setPerfiles] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [colores, setColores] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [obtenerId, setObtenerId] = useState("");
  const [obtenerIdCategoria, setObtenerIdCategoria] = useState("");
  const [obtenerIdColores, setObtenerIdColores] = useState("");
  let [isOpen, setIsOpen] = useState(false);
  let [isOpenEditar, setIsOpenEditar] = useState(false);
  let [isOpenCrearCategoria, setIsOpenCrearCategoria] = useState(false);
  let [isOpenVerCategorias, setIsOpenVerCategorias] = useState(false);
  let [isOpenEditarCategorias, setIsOpenEditarCategorias] = useState(false);
  let [isOpenVerColores, setIsOpenVerColores] = useState(false);
  let [isOpenEditarColores, setIsOpenEditarColores] = useState(false);
  let [isOpenEditarColor, setIsOpenEditarColor] = useState(false);

  const handlePerfilSeleccionado = (id) => {
    setObtenerId(id);
  };

  const handleCategoriaSeleccionada = (id) => {
    setObtenerIdCategoria(id);
  };

  const handleColorSeleccionada = (id) => {
    setObtenerIdColores(id);
  };

  //categoria nuevo producto
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  //editar modal productos
  function closeModalEditar() {
    setIsOpenEditar(false);
  }

  function openModalEditar() {
    setIsOpenEditar(true);
  }

  function closeModalCrearCategoria() {
    setIsOpenCrearCategoria(false);
  }

  function openModalCrearCategoria() {
    setIsOpenCrearCategoria(true);
  }

  function closeModalVerCategoria() {
    setIsOpenVerCategorias(false);
  }

  function openModalVerCategoria() {
    setIsOpenVerCategorias(true);
  }

  function closeModalEditarCategoria() {
    setIsOpenEditarCategorias(false);
  }

  function openModalEditarCategoria() {
    setIsOpenEditarCategorias(true);
  }

  function closeModalVerColores() {
    setIsOpenVerColores(false);
  }

  function openModalVerColores() {
    setIsOpenVerColores(true);
  }

  function closeModalEditarColores() {
    setIsOpenEditarColores(false);
  }

  function openModalEditarColores() {
    setIsOpenEditarColores(true);
  }

  function closeModalEditarColor() {
    setIsOpenEditarColor(false);
  }

  function openModalEditarColor() {
    setIsOpenEditarColor(true);
  }

  let results;

  // Función de búsqueda
  const searcher = (e) => {
    setSearch(e.target.value);
  };

  // Función de selección de categoría
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearch(""); // Clear the search when a category is selected
  };

  if (!search && !selectedCategory) {
    results = perfiles;
  } else {
    results = perfiles?.filter((dato) => {
      const nombreMatches =
        dato?.nombre.toLowerCase().includes(search.toLowerCase()) ||
        dato?.descripcion.toLowerCase().includes(search.toLowerCase());
      const categoryMatches = selectedCategory
        ? dato.categoria === selectedCategory
        : true;
      return nombreMatches && categoryMatches;
    });
  }

  useEffect(() => {
    obtenerDatosPerfiles().then((response) => {
      setPerfiles(response.data);
    });
  }, []);

  const eliminarPerfil = (id) => axios.delete(`/perfiles/${id}`);

  const handleEliminar = (id) => {
    eliminarPerfil(id);

    const perfilActualizado = perfiles.filter(
      (perfilState) => perfilState.id !== id
    );

    toast.error("¡Producto eliminado correctamente!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    setPerfiles(perfilActualizado);
  };

  useEffect(() => {
    obtenerCategorias().then((response) => {
      setCategorias(response.data);
    });
  }, []);

  const handleEliminarCategoria = (id) => {
    eliminarCategoria(id);

    const categoriaActualizada = categorias.filter(
      (categoriaState) => categoriaState.id !== id
    );

    toast.error("¡Categoria eliminada correctamente!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    setCategorias(categoriaActualizada);
  };

  useEffect(() => {
    obtenerColores().then((response) => {
      setColores(response.data);
    });
  }, []);

  const handleEliminarColor = (id) => {
    eliminarColor(id);

    const colorActualizado = colores.filter(
      (colorState) => colorState.id !== id
    );

    toast.error("¡Color eliminado correctamente!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    setColores(colorActualizado);
  };

  return (
    <AluminioContext.Provider
      value={{
        perfiles,
        handleEliminar,
        setPerfiles,
        search,
        setSearch,
        obtenerId,
        handlePerfilSeleccionado,
        results,
        closeModal,
        openModal,
        closeModalEditar,
        openModalEditar,
        isOpen,
        isOpenEditar,
        searcher,
        isOpenCrearCategoria,
        closeModalCrearCategoria,
        openModalCrearCategoria,
        categorias,
        setCategorias,
        isOpenVerCategorias,
        closeModalVerCategoria,
        openModalVerCategoria,
        handleEliminarCategoria,
        closeModalEditarCategoria,
        openModalEditarCategoria,
        isOpenEditarCategorias,
        handleCategoriaSeleccionada,
        obtenerIdCategoria,
        setColores,
        colores,
        closeModalVerColores,
        openModalVerColores,
        isOpenVerColores,
        obtenerIdColores,
        handleColorSeleccionada,
        closeModalEditarColores,
        openModalEditarColores,
        isOpenEditarColores,
        handleEliminarColor,
        closeModalEditarColor,
        openModalEditarColor,
        isOpenEditarColor,
        handleCategoryChange,
        selectedCategory,
      }}
    >
      {children}
    </AluminioContext.Provider>
  );
};
