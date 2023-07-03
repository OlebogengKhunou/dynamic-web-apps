const provinces = ['Western Cape', 'Gauteng', 'Northern Cape', 'Eastern Cape', 'KwaZulu-Natal', 'Free State']
const names = ['Ashwin', 'Sibongile', 'Jan-Hendrik', 'Sifso', 'Shailen', 'Frikkie']
console.log('CHALLENGE 1')
names.forEach((item, index) => {
    console.log(item + ` (${provinces[index]})`)
});

const provUppercase = provinces.map(item => item.toUpperCase())
console.log(provUppercase)

const nameLength = names.map(item => item.length)
console.log(nameLength)

const provSorted = provinces.toSorted()
console.log(provSorted)

const provFilter = provinces.filter(word => !word.toLowerCase().includes('cape'))
console.log(provFilter)

const nameBoolean = names.map(item => item.toLowerCase().split('').some((letter) => letter === 's'))
console.log(nameBoolean)

const indicateProvinceToAnIndividual = names.reduce((result, name, index) => {
    result[name] = provinces[index];
    return result;
  }, {});
  
  console.log(indicateProvinceToAnIndividual);

const products = [
    { product: 'banana', price: "2" },
    { product: 'mango', price: 6 },
    { product: 'potato', price: ' ' },
    { product: 'avocado', price: "8" },
    { product: 'coffee', price: 10 },
    { product: 'tea', price: '' },
]

console.log('CHALLENGE 2')
const prodNames = []

products.forEach((item) => {
    prodNames.push(item.product)
});
console.log(prodNames)

//////////////////////////////////
const productFilter = prodNames.filter(word => word.length <= 5)
console.log(productFilter)

/////////////////////////////////////
const filteredProducts = products.map((item) => {
    const price = parseInt(item.price);
    return { ...item, price };
}).filter((item) => Number.isInteger(item.price) && item.price > 0);
console.log(filteredProducts);

///////////////////////////////////////
const combinedPrice = filteredProducts.reduce((totalPrice, filteredProducts) => totalPrice + filteredProducts.price, 0);
console.log(combinedPrice);

/////////////////////////////////////////
const concatenatedNames = products.reduce((result, product, index) => {
    if (index === 0) {
      return product.product;
    } else if (index === products.length - 1) {
      return result + ' and ' + product.product;
    } else {
      return result + ', ' + product.product;
    }
  }, '');
  
  console.log(concatenatedNames);

/////////////////////////////////////////
  const { highest, lowest } = products.reduce((result, product) => {
    if (product.price > result.highest.price) {
      result.highest = product;
    }
    if (product.price < result.lowest.price) {
      result.lowest = product;
    }
    return result;
  }, { highest: { price: -Infinity }, lowest: { price: Infinity } });
  
  const formattedString = `Highest: ${highest.product}. Lowest: ${lowest.product}.`;
  
  console.log(formattedString);

  ////////////////////////////////
  const recreatedProducts = products.reduce((result, item) => {
    const entries = Object.entries(item).map(([keyName, value]) => {
      if (keyName === 'product') {
        keyName = 'name';
      } else if (keyName === 'price') {
        keyName = 'cost';
      }
      return [keyName, value];
    });
  
    const transformedItem = Object.fromEntries(entries);
    result.push(transformedItem);
    return result;
  }, []);
  
  console.log(recreatedProducts);
