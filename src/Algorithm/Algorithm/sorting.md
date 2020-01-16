# Sorting Algorithm

## Bucket sort

- Bucket sort works by distributing the elements of an array into number of buckets
- Each bucket is then sorted individually

- Create Number of buckets = ceil/floor(squareroot of total number of items)
- Iterate through each number and place it in appropriate bucket
- Appropriate bucket = Ceil((Value * number of buckets)/max value in array)
- Sort all the buckets
- Merge all the buckets