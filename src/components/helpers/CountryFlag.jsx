import React from 'react';

function CountryFlag(props) {
    const { country } = props;
    return (
        <span role="img" aria-label='country-flag'>
            {(country === 'DOMINICAN_REPUBLIC')
                ? <i class="em em-flag-do"></i> : (country === 'VENEZUELA')
                    ? <i class="em em-flag-ve"></i> : (country === 'PERU')
                        ? <i class="em em-flag-pe"></i> : ''
            }
        </span>
    )
}

export default CountryFlag