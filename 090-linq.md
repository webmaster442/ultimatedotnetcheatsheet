# LINQ

## Filtering

```csharp
var customerOrders = Orders.Where(order => order.CustomerId == 66);
```

## Select with anonymus type

```csharp
var ordersWithCost = Orders.Select(order => new
{
    OrderId = order.Id,
    Cost = order.Cost,
});
```

## Ordering

```csharp
var ascendingOrder = orders.OrderBy(order => order.Cost);
var descendingOrder = orders.OrderByDescending(order => order.Cost);

var multipleOdering = orders.OrderBy(order => order.Cost).ThenBy(order => order.CustomerId);
```

Note: Result will be an `IOrderedEnumerable<TElement>`.

## Join

```csharp
var joined = customers.Join(orders, 
                            customer => customer.Id, 
                            order => order.CustomerId
                            (customer, order) => new
                            {
                                CustomerId = customer.Id,
                                Name = customer.Name,
                                Cost = order.Cost, 
                            });
```

## Grouping

```csharp
var grouped = orders.GroupBy(order => CustomerId);
```

Note: Result will be an `IGrouping<TKey,TElement>`

## Lookup

```csharp
var packagesByCompany = packages.ToLookup(oder => oder.Date,  order => order.id); 
```

Note: Result will be an `ILookup<TKey,TElement>`, which is a one-to-many dictionary that maps keys to collections of values.

## Skip & Take

```csharp
var take3 = orders.Take(3);
var next3 = orders.Skip(3).Take(3);
```

## Element operations

```csharp
//throws exception if element not found
var firstCustomer = customers.First(customer => customer.Id == 63);
var lastCustomer = customers.Last(customer => customer.Id == 63);
//returns default value if element not found
var firstCustomer = customers.FirstOrDefault(customer => customer.Id == 63);
var lastCustomer = customers.LastOrDefault(customer => customer.Id == 63);
```

## Conversions

```csharp
Order[] orders = Orders.Where(order => order.CustomerId == 66).ToArray();
List<Order> orders = Orders.Where(order => order.CustomerId == 66).ToList();
HashSet<Order> orders = Orders.Where(order => order.CustomerId == 66).ToHashSet();
Dictionary<int, string> customerDictionary
     = Customers.ToDictionary(customer => customer.Id, customer => customer.Name);
```
