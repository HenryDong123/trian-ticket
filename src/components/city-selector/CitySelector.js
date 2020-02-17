import React, {memo, useCallback, useEffect, useMemo, useState} from "react";
import './CitySelector.css'
import propTypes from 'prop-types'
import classNames from 'classnames'

const CityItem = memo(function CityItem(props) {
    const {name, onSelect} = props
    return (
        <li className="city-li" onClick={() => onSelect(name)}>
            {
                name
            }
        </li>
    )
})
CityItem.propTyeps = {
    name: propTypes.string.isRequired,
    onSelect: propTypes.func.isRequired,
}

const CitySection = memo(
    function CitySection(props) {
        const {
            title,
            cities = [],
            onSelect
        } = props
        return (
            <ul className="city-ul" data-cate={title}>
                <li className="city-li" key={"title"}>
                    {title}
                </li>
                {
                    cities.map(city => {
                        return <CityItem key={city.name} name={city.name} onSelect={onSelect}/>
                    })
                }
            </ul>
        )
    }
)

CitySection.propTypes = {
    title: propTypes.string.isRequired,
    cities: propTypes.array,
    onSelect: propTypes.func.isRequired,
}

const AlphaIndex = memo(function AlphaIndex(props) {
    const {
        alpha,
        onClick
    } = props
    return (
        <i className="city-index-item" onClick={() => onClick(alpha)}>
            {alpha}
        </i>
    )

})
AlphaIndex.propTyeps = {
    alpha: propTypes.string.isRequired,
    onClick: propTypes.func.isRequired,
}
const alphaBet = Array.from(new Array(26), (ele, index) => {
    return String.fromCharCode(65 + index)
})
const CityList = memo(function CityList(props) {
        const {
            sections,
            onSelect,
            toAlpha,
        } = props
        return (
            <div className="city-list">
                <div className="city-cate">
                    {
                        sections.map(section => {
                            return (
                                <CitySection
                                    key={section.title}
                                    title={section.title}
                                    cities={section.citys}
                                    onSelect={onSelect}

                                />
                            )
                        })
                    }
                </div>
                <div className="city-index">
                    {
                        alphaBet.map(alpha => {
                            return <AlphaIndex alpha={alpha} key={alpha} onClick={
                                toAlpha
                            }/>
                        })
                    }
                </div>
            </div>
        )
    }
)
CityList.propTypes = {
    sections: propTypes.array.isRequired,
    onSelect: propTypes.func.isRequired,
    toAlpha: propTypes.func.isRequired,
}

const Suggest = memo(function Suggest(props) {
    const {
        searchKey,
        onSelect
    } = props
    const [result, setResult] = useState([])
    useEffect(() => {
        fetch('/rest/search?key' + encodeURIComponent(searchKey))
            .then(res => res.json())
            .then(data => {
                const {
                    result,
                    searchKey: skey
                } = data
                if (skey === searchKey) {
                    setResult(result)
                }
            })
    }, [searchKey])
    const fallbackResult = useMemo(() => {
        return result.length ? result : [{display: searchKey}]
    }, [result,searchKey])
    return (
        <div className="city-suggest">
            <ul className="city-suggest-ul">
                {
                    fallbackResult.map(item => {
                        return <SuggestItem name={item.display} onClick={onSelect} key={item.display}/>
                    })
                }
            </ul>
        </div>

    )
})
Suggest.propType = {
    searchKey: propTypes.string.isRequired,
    onSelect: propTypes.func.isRequired,
}

const SuggestItem = memo(function SuggestItem(props) {
    const {
        name,
        onClick
    } = props
    return (
        <li className="city-suggest-li" onClick={() => onClick(name)}>
            {name}
        </li>
    )
})
SuggestItem.propType = {
    name: propTypes.string.isRequired,
    onClick: propTypes.func.isRequired,
}
const CitySelector = memo(
    function CitySelector(props) {
        console.log(props)
        const {isLoading, show, cityData, onBack, fetchCityData, onSelect} = props
        const [searchKey, setSearchKey] = useState('')
        const key = useMemo(() => searchKey.trim(), [searchKey])
        useEffect(() => {
            if (!show || cityData || isLoading) {
                return
            }
            fetchCityData()
        }, [show, cityData, isLoading, fetchCityData])
        const toAlpha = useCallback(alpha => {
            document.querySelector(`[data-cate=${alpha}]`)
                .scrollIntoView()
        }, [])
        const outputCities = () => {
            if (isLoading) {
                return <div>loading...</div>
            }
            if (cityData) {
                return (
                    <CityList sections={cityData.cityList}
                              onSelect={onSelect}
                              toAlpha={toAlpha}
                    />
                )
            }
            return <div>ERROR</div>
        }
        return (
            <div className={classNames('city-selector', {
                hidden: !show
            })}>
                <div className={"city-search"}>
                    <div className="search-back" onClick={() => onBack()}>
                        <svg width="42" height={42}>
                            <polyline
                                points={"25,13 16,21 25,29"}
                                stroke="#fff"
                                strokeWidth={2}
                                fill="none"
                            />
                        </svg>
                    </div>
                    <div className="search-input-wrapper">
                        <input type="text" value={searchKey} className="search-input" placeholder="城市、车站的中文或拼音"
                               onChange={e => setSearchKey(e.target.value)}/>
                    </div>
                    <i className={classNames('search-clean', {
                        hidden: !key
                    })} onClick={() => setSearchKey('')}>
                        &#xf063;
                    </i>
                </div>
                {
                    Boolean(key) && (
                        <Suggest searchKey={key} onSelect={key => onSelect(key)}/>
                    )
                }
                {
                    outputCities()
                }
            </div>
        )

    }
)
export default CitySelector
CitySelector.propTypes = {
    isLoading: propTypes.bool.isRequired,
    show: propTypes.bool.isRequired,
    cityDate: propTypes.object,
    onBack: propTypes.func.isRequired,
    fetchCityData: propTypes.func.isRequired,
    onSelect: propTypes.func.isRequired,
}