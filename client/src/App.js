import React, { useState, useEffect } from 'react';
import Header from './header'
import { useScrollPagination } from './scrollPagination';

const NewsList = () => {



  const [news, setNews] = useState([]);
  const [countryes, setCountryes] = useState([])
  const storedCountry = localStorage.getItem('country');
  const [country, setCountry] = useState(storedCountry ? storedCountry : "us")
  const storedCategorie = localStorage.getItem('categorie');
  const [categorie, setCategorie] = useState(storedCategorie ? storedCategorie : "general");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMorePages, sethasMorePages] = useState(true)
  const [errorFetch, seterrorFetch] = useState(false)
  console.log(loading)
  useEffect(() => {
    setLoading(true);

    const fetchNews = async () => {
      try {
        if (!hasMorePages) {
          setLoading(false);
          return;
        }
        const response = await fetch(`https://vocenewsapi.vercel.app//news/${country}/${categorie}/${page}`);
        const data = await response.json();
        const hasmore = Array.isArray(data) && data.length > 0;
        if (hasmore) {
          if (page === 1) {
            setNews(data);
          } else {
            setNews(prevNews => [...prevNews, ...data]);
          }
        } else {
          sethasMorePages(false);
          console.log(hasMorePages);
        }
      } catch (error) {
        seterrorFetch(true);
        sethasMorePages(false);
      }
      setLoading(false);
    };


    fetchNews();
  }, [country, categorie, page, hasMorePages, errorFetch]);
console.log(loading)

  /////////////////////////////////////////////////////////////////////////////////>>>>>>>>>>>
  useScrollPagination(page, setPage,loading)

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch('./countryes.json');
        const data = await response.json();
        setCountryes(data.countries);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLanguages();

  }, []);


  const [isDropdownCountryVisible, setIsDropdownCountryVisible] = useState(false);
  const [isDropdownCategoriebyVisible, setIsDropdownCategoriebyVisible] = useState(false);

  const toggleDropdownCountry = () => {
    setIsDropdownCountryVisible(!isDropdownCountryVisible);
    if (isDropdownCategoriebyVisible) {
      setIsDropdownCategoriebyVisible(false);
    }
  };
  const toggleDropdownCategorieby = () => {
    setIsDropdownCategoriebyVisible(!isDropdownCategoriebyVisible);
    if (isDropdownCountryVisible) {
      setIsDropdownCountryVisible(false);
    }
  };
  ////////country and categorie change//////////
  const handleCategorieChange = (newCategorie) => {
    setCategorie(newCategorie)
    localStorage.setItem('categorie', newCategorie);
    setPage(1)
    sethasMorePages(true)
    isDropdownCategoriebyVisible(false)
  }
  const handleLanguageChange = (newLanguage) => {
    setCountry(newLanguage);
    localStorage.setItem('country', newLanguage);
    setPage(1)
    sethasMorePages(true)
    setIsDropdownCountryVisible(false)

  };
  return (
    <div className="allcontent">
      <Header />
      <main className="main_content_container">
        <div className="main_content_wrapper">
          <div className="filters_container">
            <div className='main_filters'>
              <div className="country_filter_container">
                <button className="country_filter" onClick={toggleDropdownCountry}>Country<img src="images/right-svgrepo-com.svg" alt=""></img>

                </button>
                {isDropdownCountryVisible && (
                  <div className="country_ul">
                    {countryes.map((country, index) => (
                      <button
                        className="country_select"
                        key={country.name + index}
                        onClick={() => {
                          handleLanguageChange(country.code)

                        }}>

                        {country.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="country_filter_container">
                <button className="country_filter" onClick={toggleDropdownCategorieby}>Categorie<img src="images/right-svgrepo-com.svg" alt=""></img>

                </button>
                {isDropdownCategoriebyVisible && (
                  <div className="country_ul">
                    <button type='button' className="country_select" onClick={() => handleCategorieChange('business')}>business</button>
                    <button type='button' className="country_select" onClick={() => handleCategorieChange('entertainment')}>entertainment</button>
                    <button type='button' className="country_select" onClick={() => handleCategorieChange('general')}>General</button>
                    <button type='button' className="country_select" onClick={() => handleCategorieChange('health')}>health</button>
                    <button type='button' className="country_select" onClick={() => handleCategorieChange('science')}>science</button>
                    <button type='button' className="country_select" onClick={() => handleCategorieChange('sports')}>sports</button>
                    <button type='button' className="country_select" onClick={() => handleCategorieChange('technology')}>technology</button>

                  </div>

                )}
               
              </div>
            </div>
            <div className="searchbar_wrapper">
              <input placeholder="Search your own" type="text" className="searchbar_filter"></input>

              <img src="images/search-icon.svg" alt=""></img>
            </div>

          </div>
          {page === 1 && !hasMorePages && !errorFetch && (
            <div className="loading_section">
              <h3 style={{ color: 'red' }}>No hay noticias para mostrar <br></br>
            Posiblemente no hay noticias sobre este pais o categoria, intenta cambiar de pais/categoria y/o recargar la pagina.
          </h3>
            </div>
            
          )
          
          }

          {errorFetch && !loading && (
            <div className="loading_section">
              <h3 style={{ color: 'red' }}>Error al intentar conectar con el servidor</h3>
            </div>
          )}

          {loading && (
            <div className="news_grid">
              {Array.from({ length: 20 }).map((_, index) => (
                <div className='skeleton_item' key={index}></div>


              ))}
            </div>
          )}
          {!loading || page > 1 ? (
            <div className="news_grid">
              {news.map((newItem, index) => (
                newItem.urlToImage !== null && (

                  <a href={newItem.url} className="new_item" key={newItem.title + index}>
                    <div className="img_wrapper">
                      <img
                        loading="lazy"
                        className="new_img"
                        src={newItem.urlToImage}
                        alt=""
                      />
                      <div className="likes_inside">
                        <button className="interaction_icon like_icon">
                          <svg xmlns="http://www.w3.org/2000/svg" className="icon" version="1.1" viewBox="42.67 192 938.67 768">
                            <path d="M725.333333 192c-89.6 0-168.533333 44.8-213.333333 115.2C467.2 236.8 388.266667 192 298.666667 192 157.866667 192 42.666667 307.2 42.666667 448c0 253.866667 469.333333 512 469.333333 512s469.333333-256 469.333333-512c0-140.8-115.2-256-256-256z" fill="currentColor"></path>
                          </svg>
                        </button>

                        <button className="interaction_icon dislike_icon">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="2 3 19.99 18">
                            <path d="M3,21a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H6V21ZM19.949,10H14.178V5c0-2-3.076-2-3.076-2s0,4-1.026,5C9.52,8.543,8.669,10.348,8,11V21H18.644a2.036,2.036,0,0,0,2.017-1.642l1.3-7A2.015,2.015,0,0,0,19.949,10Z"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="new_context">
                      <h2 className="new_title">{newItem.title}</h2>
                      <h3 className="new_source">{newItem.source.name}</h3>
                    </div>
                  </a>)))}
              {loading && page > 1 && (
               
                  Array.from({ length: 20 }).map((_, index) => (
                    <div className='skeleton_item' key={index}></div>


                  ))
               
              )}
          
                        
                  
            </div>) : null}
            {!hasMorePages && !errorFetch &&(
              <div className="loading_section">
                <h3 style={{ color: 'var(--main-color)' }}>Felicidades, llegaste al final de la pagina</h3>
              </div>
            )}

        </div>
      </main>
    </div>

  )
}
export default NewsList