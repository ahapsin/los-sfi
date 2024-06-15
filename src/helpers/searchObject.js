function useSearch(arr, searchKey) {
  return arr.filter(function (obj) {
    return Object.keys(obj).some(function (key) {
      return obj[key] != null && String(obj[key]).match(searchKey);
    });
  });
}
export { useSearch };
