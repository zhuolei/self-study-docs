# Java8

## Functional Programming

### Intro

```java
/**
  *下单商品信息对象
  */
public class Sku {
  // 编号
  private Integer skuId;
  // 商品名称
  private String skuName;
  // 单价
  private Double skuPrice;
  // 购买个数
  private Integer totalNum;
  // 总价
  private Double totalPrice;
  // 商品类型
  private Enum skuCategory;

  public Sku(Integer skuId, String skuName,
            Double skuPrice, Integer totalNum,
            Double totalPrice, Enum skuCategory) {
    this.skuId = skuId;
    this.skuName = skuName;
    this.skuPrice = skuPrice;
    this.totalNum = totalNum;
    this.totalPrice = totalPrice;
    this.skuCategory = skuCategory;
  }

  // todo
}
```

```java
public class CartService {

  private static List<Sku> cartSkuList = new ArrayList<Sku>() {
    
  }
}
```