import React,{ useEffect, useState } from "react";


const FiltersSection = ({setPage, sethasMorePages,setCategorie,categorie,setCountry,setCountryes,countryes,country,categories,setcategories}) =>{
    
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

useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch('./countryes.json');
        const data = await response.json();
        console.log(data)
        setCountryes(data.countries);

      } catch (error) {
        console.error(error);
      }
    };
    fetchLanguages();

  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('./categories.json');
        const data = await response.json();
        console.log(data)
        setcategories(data.categories);

      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();

  }, []);

 return(
    <div className='main_filters'>
    <div className="country_filter_container">
      <button className="country_filter" onClick={toggleDropdownCountry}>Country<img src="images/right-svgrepo-com.svg" alt=""></img>

      </button>
      {isDropdownCountryVisible && (
        <div className="country_ul">
          {countryes.map((countryitem, index) => (
            <button
              className={`country_select${countryitem.code === country ? ' active-country' : ''}`}
              key={countryitem.name + index}
              onClick={() => {
                handleLanguageChange(countryitem.code)

              }}>

              {countryitem.name}
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
      {isDropdownCategoriebyVisible && (
        <div className="country_ul">
        {categories.map((categorieitem, index) => (
          <button
            className={`country_select${categorieitem.name === categorie ? ' active-country' : ''}`}
            key={categorieitem.name + index}
            onClick={() => {
              handleCategorieChange(categorieitem.name)

            }}>

            {categorieitem.name}
          </button>
        ))}
      </div>

      )}
     
    </div>
  </div>
    )
}
export default FiltersSection

