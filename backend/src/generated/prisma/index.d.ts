
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model assets
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type assets = $Result.DefaultSelection<Prisma.$assetsPayload>
/**
 * Model assignments
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type assignments = $Result.DefaultSelection<Prisma.$assignmentsPayload>
/**
 * Model audit_logs
 * 
 */
export type audit_logs = $Result.DefaultSelection<Prisma.$audit_logsPayload>
/**
 * Model bases
 * 
 */
export type bases = $Result.DefaultSelection<Prisma.$basesPayload>
/**
 * Model expenditures
 * 
 */
export type expenditures = $Result.DefaultSelection<Prisma.$expendituresPayload>
/**
 * Model personnel
 * 
 */
export type personnel = $Result.DefaultSelection<Prisma.$personnelPayload>
/**
 * Model purchases
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type purchases = $Result.DefaultSelection<Prisma.$purchasesPayload>
/**
 * Model transfers
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type transfers = $Result.DefaultSelection<Prisma.$transfersPayload>
/**
 * Model users
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type users = $Result.DefaultSelection<Prisma.$usersPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Assets
 * const assets = await prisma.assets.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Assets
   * const assets = await prisma.assets.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.assets`: Exposes CRUD operations for the **assets** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Assets
    * const assets = await prisma.assets.findMany()
    * ```
    */
  get assets(): Prisma.assetsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.assignments`: Exposes CRUD operations for the **assignments** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Assignments
    * const assignments = await prisma.assignments.findMany()
    * ```
    */
  get assignments(): Prisma.assignmentsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.audit_logs`: Exposes CRUD operations for the **audit_logs** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Audit_logs
    * const audit_logs = await prisma.audit_logs.findMany()
    * ```
    */
  get audit_logs(): Prisma.audit_logsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bases`: Exposes CRUD operations for the **bases** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bases
    * const bases = await prisma.bases.findMany()
    * ```
    */
  get bases(): Prisma.basesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.expenditures`: Exposes CRUD operations for the **expenditures** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Expenditures
    * const expenditures = await prisma.expenditures.findMany()
    * ```
    */
  get expenditures(): Prisma.expendituresDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.personnel`: Exposes CRUD operations for the **personnel** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Personnel
    * const personnel = await prisma.personnel.findMany()
    * ```
    */
  get personnel(): Prisma.personnelDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.purchases`: Exposes CRUD operations for the **purchases** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Purchases
    * const purchases = await prisma.purchases.findMany()
    * ```
    */
  get purchases(): Prisma.purchasesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.transfers`: Exposes CRUD operations for the **transfers** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Transfers
    * const transfers = await prisma.transfers.findMany()
    * ```
    */
  get transfers(): Prisma.transfersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.users`: Exposes CRUD operations for the **users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.usersDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.10.1
   * Query Engine version: 9b628578b3b7cae625e8c927178f15a170e74a9c
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    assets: 'assets',
    assignments: 'assignments',
    audit_logs: 'audit_logs',
    bases: 'bases',
    expenditures: 'expenditures',
    personnel: 'personnel',
    purchases: 'purchases',
    transfers: 'transfers',
    users: 'users'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "assets" | "assignments" | "audit_logs" | "bases" | "expenditures" | "personnel" | "purchases" | "transfers" | "users"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      assets: {
        payload: Prisma.$assetsPayload<ExtArgs>
        fields: Prisma.assetsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.assetsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$assetsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.assetsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$assetsPayload>
          }
          findFirst: {
            args: Prisma.assetsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$assetsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.assetsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$assetsPayload>
          }
          findMany: {
            args: Prisma.assetsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$assetsPayload>[]
          }
          create: {
            args: Prisma.assetsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$assetsPayload>
          }
          createMany: {
            args: Prisma.assetsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.assetsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$assetsPayload>[]
          }
          delete: {
            args: Prisma.assetsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$assetsPayload>
          }
          update: {
            args: Prisma.assetsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$assetsPayload>
          }
          deleteMany: {
            args: Prisma.assetsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.assetsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.assetsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$assetsPayload>[]
          }
          upsert: {
            args: Prisma.assetsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$assetsPayload>
          }
          aggregate: {
            args: Prisma.AssetsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAssets>
          }
          groupBy: {
            args: Prisma.assetsGroupByArgs<ExtArgs>
            result: $Utils.Optional<AssetsGroupByOutputType>[]
          }
          count: {
            args: Prisma.assetsCountArgs<ExtArgs>
            result: $Utils.Optional<AssetsCountAggregateOutputType> | number
          }
        }
      }
      assignments: {
        payload: Prisma.$assignmentsPayload<ExtArgs>
        fields: Prisma.assignmentsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.assignmentsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$assignmentsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.assignmentsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$assignmentsPayload>
          }
          findFirst: {
            args: Prisma.assignmentsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$assignmentsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.assignmentsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$assignmentsPayload>
          }
          findMany: {
            args: Prisma.assignmentsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$assignmentsPayload>[]
          }
          create: {
            args: Prisma.assignmentsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$assignmentsPayload>
          }
          createMany: {
            args: Prisma.assignmentsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.assignmentsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$assignmentsPayload>[]
          }
          delete: {
            args: Prisma.assignmentsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$assignmentsPayload>
          }
          update: {
            args: Prisma.assignmentsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$assignmentsPayload>
          }
          deleteMany: {
            args: Prisma.assignmentsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.assignmentsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.assignmentsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$assignmentsPayload>[]
          }
          upsert: {
            args: Prisma.assignmentsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$assignmentsPayload>
          }
          aggregate: {
            args: Prisma.AssignmentsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAssignments>
          }
          groupBy: {
            args: Prisma.assignmentsGroupByArgs<ExtArgs>
            result: $Utils.Optional<AssignmentsGroupByOutputType>[]
          }
          count: {
            args: Prisma.assignmentsCountArgs<ExtArgs>
            result: $Utils.Optional<AssignmentsCountAggregateOutputType> | number
          }
        }
      }
      audit_logs: {
        payload: Prisma.$audit_logsPayload<ExtArgs>
        fields: Prisma.audit_logsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.audit_logsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$audit_logsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.audit_logsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$audit_logsPayload>
          }
          findFirst: {
            args: Prisma.audit_logsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$audit_logsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.audit_logsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$audit_logsPayload>
          }
          findMany: {
            args: Prisma.audit_logsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$audit_logsPayload>[]
          }
          create: {
            args: Prisma.audit_logsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$audit_logsPayload>
          }
          createMany: {
            args: Prisma.audit_logsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.audit_logsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$audit_logsPayload>[]
          }
          delete: {
            args: Prisma.audit_logsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$audit_logsPayload>
          }
          update: {
            args: Prisma.audit_logsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$audit_logsPayload>
          }
          deleteMany: {
            args: Prisma.audit_logsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.audit_logsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.audit_logsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$audit_logsPayload>[]
          }
          upsert: {
            args: Prisma.audit_logsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$audit_logsPayload>
          }
          aggregate: {
            args: Prisma.Audit_logsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAudit_logs>
          }
          groupBy: {
            args: Prisma.audit_logsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Audit_logsGroupByOutputType>[]
          }
          count: {
            args: Prisma.audit_logsCountArgs<ExtArgs>
            result: $Utils.Optional<Audit_logsCountAggregateOutputType> | number
          }
        }
      }
      bases: {
        payload: Prisma.$basesPayload<ExtArgs>
        fields: Prisma.basesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.basesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$basesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.basesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$basesPayload>
          }
          findFirst: {
            args: Prisma.basesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$basesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.basesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$basesPayload>
          }
          findMany: {
            args: Prisma.basesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$basesPayload>[]
          }
          create: {
            args: Prisma.basesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$basesPayload>
          }
          createMany: {
            args: Prisma.basesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.basesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$basesPayload>[]
          }
          delete: {
            args: Prisma.basesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$basesPayload>
          }
          update: {
            args: Prisma.basesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$basesPayload>
          }
          deleteMany: {
            args: Prisma.basesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.basesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.basesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$basesPayload>[]
          }
          upsert: {
            args: Prisma.basesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$basesPayload>
          }
          aggregate: {
            args: Prisma.BasesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBases>
          }
          groupBy: {
            args: Prisma.basesGroupByArgs<ExtArgs>
            result: $Utils.Optional<BasesGroupByOutputType>[]
          }
          count: {
            args: Prisma.basesCountArgs<ExtArgs>
            result: $Utils.Optional<BasesCountAggregateOutputType> | number
          }
        }
      }
      expenditures: {
        payload: Prisma.$expendituresPayload<ExtArgs>
        fields: Prisma.expendituresFieldRefs
        operations: {
          findUnique: {
            args: Prisma.expendituresFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$expendituresPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.expendituresFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$expendituresPayload>
          }
          findFirst: {
            args: Prisma.expendituresFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$expendituresPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.expendituresFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$expendituresPayload>
          }
          findMany: {
            args: Prisma.expendituresFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$expendituresPayload>[]
          }
          create: {
            args: Prisma.expendituresCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$expendituresPayload>
          }
          createMany: {
            args: Prisma.expendituresCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.expendituresCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$expendituresPayload>[]
          }
          delete: {
            args: Prisma.expendituresDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$expendituresPayload>
          }
          update: {
            args: Prisma.expendituresUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$expendituresPayload>
          }
          deleteMany: {
            args: Prisma.expendituresDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.expendituresUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.expendituresUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$expendituresPayload>[]
          }
          upsert: {
            args: Prisma.expendituresUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$expendituresPayload>
          }
          aggregate: {
            args: Prisma.ExpendituresAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExpenditures>
          }
          groupBy: {
            args: Prisma.expendituresGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExpendituresGroupByOutputType>[]
          }
          count: {
            args: Prisma.expendituresCountArgs<ExtArgs>
            result: $Utils.Optional<ExpendituresCountAggregateOutputType> | number
          }
        }
      }
      personnel: {
        payload: Prisma.$personnelPayload<ExtArgs>
        fields: Prisma.personnelFieldRefs
        operations: {
          findUnique: {
            args: Prisma.personnelFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$personnelPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.personnelFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$personnelPayload>
          }
          findFirst: {
            args: Prisma.personnelFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$personnelPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.personnelFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$personnelPayload>
          }
          findMany: {
            args: Prisma.personnelFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$personnelPayload>[]
          }
          create: {
            args: Prisma.personnelCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$personnelPayload>
          }
          createMany: {
            args: Prisma.personnelCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.personnelCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$personnelPayload>[]
          }
          delete: {
            args: Prisma.personnelDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$personnelPayload>
          }
          update: {
            args: Prisma.personnelUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$personnelPayload>
          }
          deleteMany: {
            args: Prisma.personnelDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.personnelUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.personnelUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$personnelPayload>[]
          }
          upsert: {
            args: Prisma.personnelUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$personnelPayload>
          }
          aggregate: {
            args: Prisma.PersonnelAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePersonnel>
          }
          groupBy: {
            args: Prisma.personnelGroupByArgs<ExtArgs>
            result: $Utils.Optional<PersonnelGroupByOutputType>[]
          }
          count: {
            args: Prisma.personnelCountArgs<ExtArgs>
            result: $Utils.Optional<PersonnelCountAggregateOutputType> | number
          }
        }
      }
      purchases: {
        payload: Prisma.$purchasesPayload<ExtArgs>
        fields: Prisma.purchasesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.purchasesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$purchasesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.purchasesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$purchasesPayload>
          }
          findFirst: {
            args: Prisma.purchasesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$purchasesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.purchasesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$purchasesPayload>
          }
          findMany: {
            args: Prisma.purchasesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$purchasesPayload>[]
          }
          create: {
            args: Prisma.purchasesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$purchasesPayload>
          }
          createMany: {
            args: Prisma.purchasesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.purchasesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$purchasesPayload>[]
          }
          delete: {
            args: Prisma.purchasesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$purchasesPayload>
          }
          update: {
            args: Prisma.purchasesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$purchasesPayload>
          }
          deleteMany: {
            args: Prisma.purchasesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.purchasesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.purchasesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$purchasesPayload>[]
          }
          upsert: {
            args: Prisma.purchasesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$purchasesPayload>
          }
          aggregate: {
            args: Prisma.PurchasesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePurchases>
          }
          groupBy: {
            args: Prisma.purchasesGroupByArgs<ExtArgs>
            result: $Utils.Optional<PurchasesGroupByOutputType>[]
          }
          count: {
            args: Prisma.purchasesCountArgs<ExtArgs>
            result: $Utils.Optional<PurchasesCountAggregateOutputType> | number
          }
        }
      }
      transfers: {
        payload: Prisma.$transfersPayload<ExtArgs>
        fields: Prisma.transfersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.transfersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transfersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.transfersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transfersPayload>
          }
          findFirst: {
            args: Prisma.transfersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transfersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.transfersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transfersPayload>
          }
          findMany: {
            args: Prisma.transfersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transfersPayload>[]
          }
          create: {
            args: Prisma.transfersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transfersPayload>
          }
          createMany: {
            args: Prisma.transfersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.transfersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transfersPayload>[]
          }
          delete: {
            args: Prisma.transfersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transfersPayload>
          }
          update: {
            args: Prisma.transfersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transfersPayload>
          }
          deleteMany: {
            args: Prisma.transfersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.transfersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.transfersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transfersPayload>[]
          }
          upsert: {
            args: Prisma.transfersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transfersPayload>
          }
          aggregate: {
            args: Prisma.TransfersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTransfers>
          }
          groupBy: {
            args: Prisma.transfersGroupByArgs<ExtArgs>
            result: $Utils.Optional<TransfersGroupByOutputType>[]
          }
          count: {
            args: Prisma.transfersCountArgs<ExtArgs>
            result: $Utils.Optional<TransfersCountAggregateOutputType> | number
          }
        }
      }
      users: {
        payload: Prisma.$usersPayload<ExtArgs>
        fields: Prisma.usersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.usersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findFirst: {
            args: Prisma.usersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findMany: {
            args: Prisma.usersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          create: {
            args: Prisma.usersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          createMany: {
            args: Prisma.usersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.usersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          delete: {
            args: Prisma.usersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          update: {
            args: Prisma.usersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          deleteMany: {
            args: Prisma.usersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.usersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.usersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          upsert: {
            args: Prisma.usersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.usersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.usersCountArgs<ExtArgs>
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    assets?: assetsOmit
    assignments?: assignmentsOmit
    audit_logs?: audit_logsOmit
    bases?: basesOmit
    expenditures?: expendituresOmit
    personnel?: personnelOmit
    purchases?: purchasesOmit
    transfers?: transfersOmit
    users?: usersOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type AssetsCountOutputType
   */

  export type AssetsCountOutputType = {
    purchases: number
  }

  export type AssetsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    purchases?: boolean | AssetsCountOutputTypeCountPurchasesArgs
  }

  // Custom InputTypes
  /**
   * AssetsCountOutputType without action
   */
  export type AssetsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssetsCountOutputType
     */
    select?: AssetsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AssetsCountOutputType without action
   */
  export type AssetsCountOutputTypeCountPurchasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: purchasesWhereInput
  }


  /**
   * Count Type BasesCountOutputType
   */

  export type BasesCountOutputType = {
    assets: number
    assignments: number
    expenditures: number
    personnel: number
    purchases: number
    transfers_transfers_from_base_idTobases: number
    transfers_transfers_to_base_idTobases: number
    users_users_base_idTobases: number
  }

  export type BasesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assets?: boolean | BasesCountOutputTypeCountAssetsArgs
    assignments?: boolean | BasesCountOutputTypeCountAssignmentsArgs
    expenditures?: boolean | BasesCountOutputTypeCountExpendituresArgs
    personnel?: boolean | BasesCountOutputTypeCountPersonnelArgs
    purchases?: boolean | BasesCountOutputTypeCountPurchasesArgs
    transfers_transfers_from_base_idTobases?: boolean | BasesCountOutputTypeCountTransfers_transfers_from_base_idTobasesArgs
    transfers_transfers_to_base_idTobases?: boolean | BasesCountOutputTypeCountTransfers_transfers_to_base_idTobasesArgs
    users_users_base_idTobases?: boolean | BasesCountOutputTypeCountUsers_users_base_idTobasesArgs
  }

  // Custom InputTypes
  /**
   * BasesCountOutputType without action
   */
  export type BasesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BasesCountOutputType
     */
    select?: BasesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BasesCountOutputType without action
   */
  export type BasesCountOutputTypeCountAssetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: assetsWhereInput
  }

  /**
   * BasesCountOutputType without action
   */
  export type BasesCountOutputTypeCountAssignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: assignmentsWhereInput
  }

  /**
   * BasesCountOutputType without action
   */
  export type BasesCountOutputTypeCountExpendituresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: expendituresWhereInput
  }

  /**
   * BasesCountOutputType without action
   */
  export type BasesCountOutputTypeCountPersonnelArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: personnelWhereInput
  }

  /**
   * BasesCountOutputType without action
   */
  export type BasesCountOutputTypeCountPurchasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: purchasesWhereInput
  }

  /**
   * BasesCountOutputType without action
   */
  export type BasesCountOutputTypeCountTransfers_transfers_from_base_idTobasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: transfersWhereInput
  }

  /**
   * BasesCountOutputType without action
   */
  export type BasesCountOutputTypeCountTransfers_transfers_to_base_idTobasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: transfersWhereInput
  }

  /**
   * BasesCountOutputType without action
   */
  export type BasesCountOutputTypeCountUsers_users_base_idTobasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
  }


  /**
   * Count Type PersonnelCountOutputType
   */

  export type PersonnelCountOutputType = {
    assignments: number
    expenditures: number
  }

  export type PersonnelCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignments?: boolean | PersonnelCountOutputTypeCountAssignmentsArgs
    expenditures?: boolean | PersonnelCountOutputTypeCountExpendituresArgs
  }

  // Custom InputTypes
  /**
   * PersonnelCountOutputType without action
   */
  export type PersonnelCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonnelCountOutputType
     */
    select?: PersonnelCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PersonnelCountOutputType without action
   */
  export type PersonnelCountOutputTypeCountAssignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: assignmentsWhereInput
  }

  /**
   * PersonnelCountOutputType without action
   */
  export type PersonnelCountOutputTypeCountExpendituresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: expendituresWhereInput
  }


  /**
   * Count Type UsersCountOutputType
   */

  export type UsersCountOutputType = {
    assignments: number
    audit_logs: number
    bases_bases_commander_idTousers: number
    expenditures_expenditures_authorized_byTousers: number
    expenditures_expenditures_created_byTousers: number
    purchases_purchases_approved_byTousers: number
    purchases_purchases_created_byTousers: number
    transfers_transfers_approved_byTousers: number
    transfers_transfers_created_byTousers: number
  }

  export type UsersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignments?: boolean | UsersCountOutputTypeCountAssignmentsArgs
    audit_logs?: boolean | UsersCountOutputTypeCountAudit_logsArgs
    bases_bases_commander_idTousers?: boolean | UsersCountOutputTypeCountBases_bases_commander_idTousersArgs
    expenditures_expenditures_authorized_byTousers?: boolean | UsersCountOutputTypeCountExpenditures_expenditures_authorized_byTousersArgs
    expenditures_expenditures_created_byTousers?: boolean | UsersCountOutputTypeCountExpenditures_expenditures_created_byTousersArgs
    purchases_purchases_approved_byTousers?: boolean | UsersCountOutputTypeCountPurchases_purchases_approved_byTousersArgs
    purchases_purchases_created_byTousers?: boolean | UsersCountOutputTypeCountPurchases_purchases_created_byTousersArgs
    transfers_transfers_approved_byTousers?: boolean | UsersCountOutputTypeCountTransfers_transfers_approved_byTousersArgs
    transfers_transfers_created_byTousers?: boolean | UsersCountOutputTypeCountTransfers_transfers_created_byTousersArgs
  }

  // Custom InputTypes
  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersCountOutputType
     */
    select?: UsersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountAssignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: assignmentsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountAudit_logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: audit_logsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountBases_bases_commander_idTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: basesWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountExpenditures_expenditures_authorized_byTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: expendituresWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountExpenditures_expenditures_created_byTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: expendituresWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountPurchases_purchases_approved_byTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: purchasesWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountPurchases_purchases_created_byTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: purchasesWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountTransfers_transfers_approved_byTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: transfersWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountTransfers_transfers_created_byTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: transfersWhereInput
  }


  /**
   * Models
   */

  /**
   * Model assets
   */

  export type AggregateAssets = {
    _count: AssetsCountAggregateOutputType | null
    _avg: AssetsAvgAggregateOutputType | null
    _sum: AssetsSumAggregateOutputType | null
    _min: AssetsMinAggregateOutputType | null
    _max: AssetsMaxAggregateOutputType | null
  }

  export type AssetsAvgAggregateOutputType = {
    quantity: number | null
    available_quantity: number | null
    assigned_quantity: number | null
  }

  export type AssetsSumAggregateOutputType = {
    quantity: number | null
    available_quantity: number | null
    assigned_quantity: number | null
  }

  export type AssetsMinAggregateOutputType = {
    id: string | null
    name: string | null
    base_id: string | null
    quantity: number | null
    available_quantity: number | null
    assigned_quantity: number | null
    status: string | null
    created_at: Date | null
  }

  export type AssetsMaxAggregateOutputType = {
    id: string | null
    name: string | null
    base_id: string | null
    quantity: number | null
    available_quantity: number | null
    assigned_quantity: number | null
    status: string | null
    created_at: Date | null
  }

  export type AssetsCountAggregateOutputType = {
    id: number
    name: number
    base_id: number
    quantity: number
    available_quantity: number
    assigned_quantity: number
    status: number
    created_at: number
    _all: number
  }


  export type AssetsAvgAggregateInputType = {
    quantity?: true
    available_quantity?: true
    assigned_quantity?: true
  }

  export type AssetsSumAggregateInputType = {
    quantity?: true
    available_quantity?: true
    assigned_quantity?: true
  }

  export type AssetsMinAggregateInputType = {
    id?: true
    name?: true
    base_id?: true
    quantity?: true
    available_quantity?: true
    assigned_quantity?: true
    status?: true
    created_at?: true
  }

  export type AssetsMaxAggregateInputType = {
    id?: true
    name?: true
    base_id?: true
    quantity?: true
    available_quantity?: true
    assigned_quantity?: true
    status?: true
    created_at?: true
  }

  export type AssetsCountAggregateInputType = {
    id?: true
    name?: true
    base_id?: true
    quantity?: true
    available_quantity?: true
    assigned_quantity?: true
    status?: true
    created_at?: true
    _all?: true
  }

  export type AssetsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which assets to aggregate.
     */
    where?: assetsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of assets to fetch.
     */
    orderBy?: assetsOrderByWithRelationInput | assetsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: assetsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` assets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` assets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned assets
    **/
    _count?: true | AssetsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AssetsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AssetsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AssetsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AssetsMaxAggregateInputType
  }

  export type GetAssetsAggregateType<T extends AssetsAggregateArgs> = {
        [P in keyof T & keyof AggregateAssets]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAssets[P]>
      : GetScalarType<T[P], AggregateAssets[P]>
  }




  export type assetsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: assetsWhereInput
    orderBy?: assetsOrderByWithAggregationInput | assetsOrderByWithAggregationInput[]
    by: AssetsScalarFieldEnum[] | AssetsScalarFieldEnum
    having?: assetsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AssetsCountAggregateInputType | true
    _avg?: AssetsAvgAggregateInputType
    _sum?: AssetsSumAggregateInputType
    _min?: AssetsMinAggregateInputType
    _max?: AssetsMaxAggregateInputType
  }

  export type AssetsGroupByOutputType = {
    id: string
    name: string
    base_id: string
    quantity: number
    available_quantity: number
    assigned_quantity: number
    status: string
    created_at: Date | null
    _count: AssetsCountAggregateOutputType | null
    _avg: AssetsAvgAggregateOutputType | null
    _sum: AssetsSumAggregateOutputType | null
    _min: AssetsMinAggregateOutputType | null
    _max: AssetsMaxAggregateOutputType | null
  }

  type GetAssetsGroupByPayload<T extends assetsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AssetsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AssetsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AssetsGroupByOutputType[P]>
            : GetScalarType<T[P], AssetsGroupByOutputType[P]>
        }
      >
    >


  export type assetsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    base_id?: boolean
    quantity?: boolean
    available_quantity?: boolean
    assigned_quantity?: boolean
    status?: boolean
    created_at?: boolean
    bases?: boolean | basesDefaultArgs<ExtArgs>
    purchases?: boolean | assets$purchasesArgs<ExtArgs>
    _count?: boolean | AssetsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assets"]>

  export type assetsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    base_id?: boolean
    quantity?: boolean
    available_quantity?: boolean
    assigned_quantity?: boolean
    status?: boolean
    created_at?: boolean
    bases?: boolean | basesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assets"]>

  export type assetsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    base_id?: boolean
    quantity?: boolean
    available_quantity?: boolean
    assigned_quantity?: boolean
    status?: boolean
    created_at?: boolean
    bases?: boolean | basesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assets"]>

  export type assetsSelectScalar = {
    id?: boolean
    name?: boolean
    base_id?: boolean
    quantity?: boolean
    available_quantity?: boolean
    assigned_quantity?: boolean
    status?: boolean
    created_at?: boolean
  }

  export type assetsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "base_id" | "quantity" | "available_quantity" | "assigned_quantity" | "status" | "created_at", ExtArgs["result"]["assets"]>
  export type assetsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bases?: boolean | basesDefaultArgs<ExtArgs>
    purchases?: boolean | assets$purchasesArgs<ExtArgs>
    _count?: boolean | AssetsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type assetsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bases?: boolean | basesDefaultArgs<ExtArgs>
  }
  export type assetsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bases?: boolean | basesDefaultArgs<ExtArgs>
  }

  export type $assetsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "assets"
    objects: {
      bases: Prisma.$basesPayload<ExtArgs>
      purchases: Prisma.$purchasesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      base_id: string
      quantity: number
      available_quantity: number
      assigned_quantity: number
      status: string
      created_at: Date | null
    }, ExtArgs["result"]["assets"]>
    composites: {}
  }

  type assetsGetPayload<S extends boolean | null | undefined | assetsDefaultArgs> = $Result.GetResult<Prisma.$assetsPayload, S>

  type assetsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<assetsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AssetsCountAggregateInputType | true
    }

  export interface assetsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['assets'], meta: { name: 'assets' } }
    /**
     * Find zero or one Assets that matches the filter.
     * @param {assetsFindUniqueArgs} args - Arguments to find a Assets
     * @example
     * // Get one Assets
     * const assets = await prisma.assets.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends assetsFindUniqueArgs>(args: SelectSubset<T, assetsFindUniqueArgs<ExtArgs>>): Prisma__assetsClient<$Result.GetResult<Prisma.$assetsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Assets that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {assetsFindUniqueOrThrowArgs} args - Arguments to find a Assets
     * @example
     * // Get one Assets
     * const assets = await prisma.assets.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends assetsFindUniqueOrThrowArgs>(args: SelectSubset<T, assetsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__assetsClient<$Result.GetResult<Prisma.$assetsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Assets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {assetsFindFirstArgs} args - Arguments to find a Assets
     * @example
     * // Get one Assets
     * const assets = await prisma.assets.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends assetsFindFirstArgs>(args?: SelectSubset<T, assetsFindFirstArgs<ExtArgs>>): Prisma__assetsClient<$Result.GetResult<Prisma.$assetsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Assets that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {assetsFindFirstOrThrowArgs} args - Arguments to find a Assets
     * @example
     * // Get one Assets
     * const assets = await prisma.assets.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends assetsFindFirstOrThrowArgs>(args?: SelectSubset<T, assetsFindFirstOrThrowArgs<ExtArgs>>): Prisma__assetsClient<$Result.GetResult<Prisma.$assetsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Assets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {assetsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Assets
     * const assets = await prisma.assets.findMany()
     * 
     * // Get first 10 Assets
     * const assets = await prisma.assets.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const assetsWithIdOnly = await prisma.assets.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends assetsFindManyArgs>(args?: SelectSubset<T, assetsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$assetsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Assets.
     * @param {assetsCreateArgs} args - Arguments to create a Assets.
     * @example
     * // Create one Assets
     * const Assets = await prisma.assets.create({
     *   data: {
     *     // ... data to create a Assets
     *   }
     * })
     * 
     */
    create<T extends assetsCreateArgs>(args: SelectSubset<T, assetsCreateArgs<ExtArgs>>): Prisma__assetsClient<$Result.GetResult<Prisma.$assetsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Assets.
     * @param {assetsCreateManyArgs} args - Arguments to create many Assets.
     * @example
     * // Create many Assets
     * const assets = await prisma.assets.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends assetsCreateManyArgs>(args?: SelectSubset<T, assetsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Assets and returns the data saved in the database.
     * @param {assetsCreateManyAndReturnArgs} args - Arguments to create many Assets.
     * @example
     * // Create many Assets
     * const assets = await prisma.assets.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Assets and only return the `id`
     * const assetsWithIdOnly = await prisma.assets.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends assetsCreateManyAndReturnArgs>(args?: SelectSubset<T, assetsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$assetsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Assets.
     * @param {assetsDeleteArgs} args - Arguments to delete one Assets.
     * @example
     * // Delete one Assets
     * const Assets = await prisma.assets.delete({
     *   where: {
     *     // ... filter to delete one Assets
     *   }
     * })
     * 
     */
    delete<T extends assetsDeleteArgs>(args: SelectSubset<T, assetsDeleteArgs<ExtArgs>>): Prisma__assetsClient<$Result.GetResult<Prisma.$assetsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Assets.
     * @param {assetsUpdateArgs} args - Arguments to update one Assets.
     * @example
     * // Update one Assets
     * const assets = await prisma.assets.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends assetsUpdateArgs>(args: SelectSubset<T, assetsUpdateArgs<ExtArgs>>): Prisma__assetsClient<$Result.GetResult<Prisma.$assetsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Assets.
     * @param {assetsDeleteManyArgs} args - Arguments to filter Assets to delete.
     * @example
     * // Delete a few Assets
     * const { count } = await prisma.assets.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends assetsDeleteManyArgs>(args?: SelectSubset<T, assetsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Assets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {assetsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Assets
     * const assets = await prisma.assets.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends assetsUpdateManyArgs>(args: SelectSubset<T, assetsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Assets and returns the data updated in the database.
     * @param {assetsUpdateManyAndReturnArgs} args - Arguments to update many Assets.
     * @example
     * // Update many Assets
     * const assets = await prisma.assets.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Assets and only return the `id`
     * const assetsWithIdOnly = await prisma.assets.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends assetsUpdateManyAndReturnArgs>(args: SelectSubset<T, assetsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$assetsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Assets.
     * @param {assetsUpsertArgs} args - Arguments to update or create a Assets.
     * @example
     * // Update or create a Assets
     * const assets = await prisma.assets.upsert({
     *   create: {
     *     // ... data to create a Assets
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Assets we want to update
     *   }
     * })
     */
    upsert<T extends assetsUpsertArgs>(args: SelectSubset<T, assetsUpsertArgs<ExtArgs>>): Prisma__assetsClient<$Result.GetResult<Prisma.$assetsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Assets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {assetsCountArgs} args - Arguments to filter Assets to count.
     * @example
     * // Count the number of Assets
     * const count = await prisma.assets.count({
     *   where: {
     *     // ... the filter for the Assets we want to count
     *   }
     * })
    **/
    count<T extends assetsCountArgs>(
      args?: Subset<T, assetsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AssetsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Assets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AssetsAggregateArgs>(args: Subset<T, AssetsAggregateArgs>): Prisma.PrismaPromise<GetAssetsAggregateType<T>>

    /**
     * Group by Assets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {assetsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends assetsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: assetsGroupByArgs['orderBy'] }
        : { orderBy?: assetsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, assetsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAssetsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the assets model
   */
  readonly fields: assetsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for assets.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__assetsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bases<T extends basesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, basesDefaultArgs<ExtArgs>>): Prisma__basesClient<$Result.GetResult<Prisma.$basesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    purchases<T extends assets$purchasesArgs<ExtArgs> = {}>(args?: Subset<T, assets$purchasesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$purchasesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the assets model
   */
  interface assetsFieldRefs {
    readonly id: FieldRef<"assets", 'String'>
    readonly name: FieldRef<"assets", 'String'>
    readonly base_id: FieldRef<"assets", 'String'>
    readonly quantity: FieldRef<"assets", 'Int'>
    readonly available_quantity: FieldRef<"assets", 'Int'>
    readonly assigned_quantity: FieldRef<"assets", 'Int'>
    readonly status: FieldRef<"assets", 'String'>
    readonly created_at: FieldRef<"assets", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * assets findUnique
   */
  export type assetsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the assets
     */
    select?: assetsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the assets
     */
    omit?: assetsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: assetsInclude<ExtArgs> | null
    /**
     * Filter, which assets to fetch.
     */
    where: assetsWhereUniqueInput
  }

  /**
   * assets findUniqueOrThrow
   */
  export type assetsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the assets
     */
    select?: assetsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the assets
     */
    omit?: assetsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: assetsInclude<ExtArgs> | null
    /**
     * Filter, which assets to fetch.
     */
    where: assetsWhereUniqueInput
  }

  /**
   * assets findFirst
   */
  export type assetsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the assets
     */
    select?: assetsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the assets
     */
    omit?: assetsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: assetsInclude<ExtArgs> | null
    /**
     * Filter, which assets to fetch.
     */
    where?: assetsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of assets to fetch.
     */
    orderBy?: assetsOrderByWithRelationInput | assetsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for assets.
     */
    cursor?: assetsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` assets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` assets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of assets.
     */
    distinct?: AssetsScalarFieldEnum | AssetsScalarFieldEnum[]
  }

  /**
   * assets findFirstOrThrow
   */
  export type assetsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the assets
     */
    select?: assetsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the assets
     */
    omit?: assetsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: assetsInclude<ExtArgs> | null
    /**
     * Filter, which assets to fetch.
     */
    where?: assetsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of assets to fetch.
     */
    orderBy?: assetsOrderByWithRelationInput | assetsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for assets.
     */
    cursor?: assetsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` assets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` assets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of assets.
     */
    distinct?: AssetsScalarFieldEnum | AssetsScalarFieldEnum[]
  }

  /**
   * assets findMany
   */
  export type assetsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the assets
     */
    select?: assetsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the assets
     */
    omit?: assetsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: assetsInclude<ExtArgs> | null
    /**
     * Filter, which assets to fetch.
     */
    where?: assetsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of assets to fetch.
     */
    orderBy?: assetsOrderByWithRelationInput | assetsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing assets.
     */
    cursor?: assetsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` assets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` assets.
     */
    skip?: number
    distinct?: AssetsScalarFieldEnum | AssetsScalarFieldEnum[]
  }

  /**
   * assets create
   */
  export type assetsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the assets
     */
    select?: assetsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the assets
     */
    omit?: assetsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: assetsInclude<ExtArgs> | null
    /**
     * The data needed to create a assets.
     */
    data: XOR<assetsCreateInput, assetsUncheckedCreateInput>
  }

  /**
   * assets createMany
   */
  export type assetsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many assets.
     */
    data: assetsCreateManyInput | assetsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * assets createManyAndReturn
   */
  export type assetsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the assets
     */
    select?: assetsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the assets
     */
    omit?: assetsOmit<ExtArgs> | null
    /**
     * The data used to create many assets.
     */
    data: assetsCreateManyInput | assetsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: assetsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * assets update
   */
  export type assetsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the assets
     */
    select?: assetsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the assets
     */
    omit?: assetsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: assetsInclude<ExtArgs> | null
    /**
     * The data needed to update a assets.
     */
    data: XOR<assetsUpdateInput, assetsUncheckedUpdateInput>
    /**
     * Choose, which assets to update.
     */
    where: assetsWhereUniqueInput
  }

  /**
   * assets updateMany
   */
  export type assetsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update assets.
     */
    data: XOR<assetsUpdateManyMutationInput, assetsUncheckedUpdateManyInput>
    /**
     * Filter which assets to update
     */
    where?: assetsWhereInput
    /**
     * Limit how many assets to update.
     */
    limit?: number
  }

  /**
   * assets updateManyAndReturn
   */
  export type assetsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the assets
     */
    select?: assetsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the assets
     */
    omit?: assetsOmit<ExtArgs> | null
    /**
     * The data used to update assets.
     */
    data: XOR<assetsUpdateManyMutationInput, assetsUncheckedUpdateManyInput>
    /**
     * Filter which assets to update
     */
    where?: assetsWhereInput
    /**
     * Limit how many assets to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: assetsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * assets upsert
   */
  export type assetsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the assets
     */
    select?: assetsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the assets
     */
    omit?: assetsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: assetsInclude<ExtArgs> | null
    /**
     * The filter to search for the assets to update in case it exists.
     */
    where: assetsWhereUniqueInput
    /**
     * In case the assets found by the `where` argument doesn't exist, create a new assets with this data.
     */
    create: XOR<assetsCreateInput, assetsUncheckedCreateInput>
    /**
     * In case the assets was found with the provided `where` argument, update it with this data.
     */
    update: XOR<assetsUpdateInput, assetsUncheckedUpdateInput>
  }

  /**
   * assets delete
   */
  export type assetsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the assets
     */
    select?: assetsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the assets
     */
    omit?: assetsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: assetsInclude<ExtArgs> | null
    /**
     * Filter which assets to delete.
     */
    where: assetsWhereUniqueInput
  }

  /**
   * assets deleteMany
   */
  export type assetsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which assets to delete
     */
    where?: assetsWhereInput
    /**
     * Limit how many assets to delete.
     */
    limit?: number
  }

  /**
   * assets.purchases
   */
  export type assets$purchasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the purchases
     */
    select?: purchasesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the purchases
     */
    omit?: purchasesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: purchasesInclude<ExtArgs> | null
    where?: purchasesWhereInput
    orderBy?: purchasesOrderByWithRelationInput | purchasesOrderByWithRelationInput[]
    cursor?: purchasesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PurchasesScalarFieldEnum | PurchasesScalarFieldEnum[]
  }

  /**
   * assets without action
   */
  export type assetsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the assets
     */
    select?: assetsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the assets
     */
    omit?: assetsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: assetsInclude<ExtArgs> | null
  }


  /**
   * Model assignments
   */

  export type AggregateAssignments = {
    _count: AssignmentsCountAggregateOutputType | null
    _avg: AssignmentsAvgAggregateOutputType | null
    _sum: AssignmentsSumAggregateOutputType | null
    _min: AssignmentsMinAggregateOutputType | null
    _max: AssignmentsMaxAggregateOutputType | null
  }

  export type AssignmentsAvgAggregateOutputType = {
    quantity: number | null
    expended_quantity: number | null
  }

  export type AssignmentsSumAggregateOutputType = {
    quantity: number | null
    expended_quantity: number | null
  }

  export type AssignmentsMinAggregateOutputType = {
    id: string | null
    asset_name: string | null
    assigned_to: string | null
    assigned_by: string | null
    base_id: string | null
    quantity: number | null
    expended_quantity: number | null
    assignment_date: Date | null
    status: string | null
    notes: string | null
    created_at: Date | null
  }

  export type AssignmentsMaxAggregateOutputType = {
    id: string | null
    asset_name: string | null
    assigned_to: string | null
    assigned_by: string | null
    base_id: string | null
    quantity: number | null
    expended_quantity: number | null
    assignment_date: Date | null
    status: string | null
    notes: string | null
    created_at: Date | null
  }

  export type AssignmentsCountAggregateOutputType = {
    id: number
    asset_name: number
    assigned_to: number
    assigned_by: number
    base_id: number
    quantity: number
    expended_quantity: number
    assignment_date: number
    status: number
    notes: number
    created_at: number
    _all: number
  }


  export type AssignmentsAvgAggregateInputType = {
    quantity?: true
    expended_quantity?: true
  }

  export type AssignmentsSumAggregateInputType = {
    quantity?: true
    expended_quantity?: true
  }

  export type AssignmentsMinAggregateInputType = {
    id?: true
    asset_name?: true
    assigned_to?: true
    assigned_by?: true
    base_id?: true
    quantity?: true
    expended_quantity?: true
    assignment_date?: true
    status?: true
    notes?: true
    created_at?: true
  }

  export type AssignmentsMaxAggregateInputType = {
    id?: true
    asset_name?: true
    assigned_to?: true
    assigned_by?: true
    base_id?: true
    quantity?: true
    expended_quantity?: true
    assignment_date?: true
    status?: true
    notes?: true
    created_at?: true
  }

  export type AssignmentsCountAggregateInputType = {
    id?: true
    asset_name?: true
    assigned_to?: true
    assigned_by?: true
    base_id?: true
    quantity?: true
    expended_quantity?: true
    assignment_date?: true
    status?: true
    notes?: true
    created_at?: true
    _all?: true
  }

  export type AssignmentsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which assignments to aggregate.
     */
    where?: assignmentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of assignments to fetch.
     */
    orderBy?: assignmentsOrderByWithRelationInput | assignmentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: assignmentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` assignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` assignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned assignments
    **/
    _count?: true | AssignmentsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AssignmentsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AssignmentsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AssignmentsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AssignmentsMaxAggregateInputType
  }

  export type GetAssignmentsAggregateType<T extends AssignmentsAggregateArgs> = {
        [P in keyof T & keyof AggregateAssignments]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAssignments[P]>
      : GetScalarType<T[P], AggregateAssignments[P]>
  }




  export type assignmentsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: assignmentsWhereInput
    orderBy?: assignmentsOrderByWithAggregationInput | assignmentsOrderByWithAggregationInput[]
    by: AssignmentsScalarFieldEnum[] | AssignmentsScalarFieldEnum
    having?: assignmentsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AssignmentsCountAggregateInputType | true
    _avg?: AssignmentsAvgAggregateInputType
    _sum?: AssignmentsSumAggregateInputType
    _min?: AssignmentsMinAggregateInputType
    _max?: AssignmentsMaxAggregateInputType
  }

  export type AssignmentsGroupByOutputType = {
    id: string
    asset_name: string
    assigned_to: string
    assigned_by: string
    base_id: string
    quantity: number
    expended_quantity: number
    assignment_date: Date
    status: string
    notes: string | null
    created_at: Date | null
    _count: AssignmentsCountAggregateOutputType | null
    _avg: AssignmentsAvgAggregateOutputType | null
    _sum: AssignmentsSumAggregateOutputType | null
    _min: AssignmentsMinAggregateOutputType | null
    _max: AssignmentsMaxAggregateOutputType | null
  }

  type GetAssignmentsGroupByPayload<T extends assignmentsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AssignmentsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AssignmentsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AssignmentsGroupByOutputType[P]>
            : GetScalarType<T[P], AssignmentsGroupByOutputType[P]>
        }
      >
    >


  export type assignmentsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    asset_name?: boolean
    assigned_to?: boolean
    assigned_by?: boolean
    base_id?: boolean
    quantity?: boolean
    expended_quantity?: boolean
    assignment_date?: boolean
    status?: boolean
    notes?: boolean
    created_at?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
    personnel?: boolean | personnelDefaultArgs<ExtArgs>
    bases?: boolean | basesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assignments"]>

  export type assignmentsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    asset_name?: boolean
    assigned_to?: boolean
    assigned_by?: boolean
    base_id?: boolean
    quantity?: boolean
    expended_quantity?: boolean
    assignment_date?: boolean
    status?: boolean
    notes?: boolean
    created_at?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
    personnel?: boolean | personnelDefaultArgs<ExtArgs>
    bases?: boolean | basesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assignments"]>

  export type assignmentsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    asset_name?: boolean
    assigned_to?: boolean
    assigned_by?: boolean
    base_id?: boolean
    quantity?: boolean
    expended_quantity?: boolean
    assignment_date?: boolean
    status?: boolean
    notes?: boolean
    created_at?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
    personnel?: boolean | personnelDefaultArgs<ExtArgs>
    bases?: boolean | basesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assignments"]>

  export type assignmentsSelectScalar = {
    id?: boolean
    asset_name?: boolean
    assigned_to?: boolean
    assigned_by?: boolean
    base_id?: boolean
    quantity?: boolean
    expended_quantity?: boolean
    assignment_date?: boolean
    status?: boolean
    notes?: boolean
    created_at?: boolean
  }

  export type assignmentsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "asset_name" | "assigned_to" | "assigned_by" | "base_id" | "quantity" | "expended_quantity" | "assignment_date" | "status" | "notes" | "created_at", ExtArgs["result"]["assignments"]>
  export type assignmentsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
    personnel?: boolean | personnelDefaultArgs<ExtArgs>
    bases?: boolean | basesDefaultArgs<ExtArgs>
  }
  export type assignmentsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
    personnel?: boolean | personnelDefaultArgs<ExtArgs>
    bases?: boolean | basesDefaultArgs<ExtArgs>
  }
  export type assignmentsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
    personnel?: boolean | personnelDefaultArgs<ExtArgs>
    bases?: boolean | basesDefaultArgs<ExtArgs>
  }

  export type $assignmentsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "assignments"
    objects: {
      users: Prisma.$usersPayload<ExtArgs>
      personnel: Prisma.$personnelPayload<ExtArgs>
      bases: Prisma.$basesPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      asset_name: string
      assigned_to: string
      assigned_by: string
      base_id: string
      quantity: number
      expended_quantity: number
      assignment_date: Date
      status: string
      notes: string | null
      created_at: Date | null
    }, ExtArgs["result"]["assignments"]>
    composites: {}
  }

  type assignmentsGetPayload<S extends boolean | null | undefined | assignmentsDefaultArgs> = $Result.GetResult<Prisma.$assignmentsPayload, S>

  type assignmentsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<assignmentsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AssignmentsCountAggregateInputType | true
    }

  export interface assignmentsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['assignments'], meta: { name: 'assignments' } }
    /**
     * Find zero or one Assignments that matches the filter.
     * @param {assignmentsFindUniqueArgs} args - Arguments to find a Assignments
     * @example
     * // Get one Assignments
     * const assignments = await prisma.assignments.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends assignmentsFindUniqueArgs>(args: SelectSubset<T, assignmentsFindUniqueArgs<ExtArgs>>): Prisma__assignmentsClient<$Result.GetResult<Prisma.$assignmentsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Assignments that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {assignmentsFindUniqueOrThrowArgs} args - Arguments to find a Assignments
     * @example
     * // Get one Assignments
     * const assignments = await prisma.assignments.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends assignmentsFindUniqueOrThrowArgs>(args: SelectSubset<T, assignmentsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__assignmentsClient<$Result.GetResult<Prisma.$assignmentsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Assignments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {assignmentsFindFirstArgs} args - Arguments to find a Assignments
     * @example
     * // Get one Assignments
     * const assignments = await prisma.assignments.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends assignmentsFindFirstArgs>(args?: SelectSubset<T, assignmentsFindFirstArgs<ExtArgs>>): Prisma__assignmentsClient<$Result.GetResult<Prisma.$assignmentsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Assignments that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {assignmentsFindFirstOrThrowArgs} args - Arguments to find a Assignments
     * @example
     * // Get one Assignments
     * const assignments = await prisma.assignments.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends assignmentsFindFirstOrThrowArgs>(args?: SelectSubset<T, assignmentsFindFirstOrThrowArgs<ExtArgs>>): Prisma__assignmentsClient<$Result.GetResult<Prisma.$assignmentsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Assignments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {assignmentsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Assignments
     * const assignments = await prisma.assignments.findMany()
     * 
     * // Get first 10 Assignments
     * const assignments = await prisma.assignments.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const assignmentsWithIdOnly = await prisma.assignments.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends assignmentsFindManyArgs>(args?: SelectSubset<T, assignmentsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$assignmentsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Assignments.
     * @param {assignmentsCreateArgs} args - Arguments to create a Assignments.
     * @example
     * // Create one Assignments
     * const Assignments = await prisma.assignments.create({
     *   data: {
     *     // ... data to create a Assignments
     *   }
     * })
     * 
     */
    create<T extends assignmentsCreateArgs>(args: SelectSubset<T, assignmentsCreateArgs<ExtArgs>>): Prisma__assignmentsClient<$Result.GetResult<Prisma.$assignmentsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Assignments.
     * @param {assignmentsCreateManyArgs} args - Arguments to create many Assignments.
     * @example
     * // Create many Assignments
     * const assignments = await prisma.assignments.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends assignmentsCreateManyArgs>(args?: SelectSubset<T, assignmentsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Assignments and returns the data saved in the database.
     * @param {assignmentsCreateManyAndReturnArgs} args - Arguments to create many Assignments.
     * @example
     * // Create many Assignments
     * const assignments = await prisma.assignments.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Assignments and only return the `id`
     * const assignmentsWithIdOnly = await prisma.assignments.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends assignmentsCreateManyAndReturnArgs>(args?: SelectSubset<T, assignmentsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$assignmentsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Assignments.
     * @param {assignmentsDeleteArgs} args - Arguments to delete one Assignments.
     * @example
     * // Delete one Assignments
     * const Assignments = await prisma.assignments.delete({
     *   where: {
     *     // ... filter to delete one Assignments
     *   }
     * })
     * 
     */
    delete<T extends assignmentsDeleteArgs>(args: SelectSubset<T, assignmentsDeleteArgs<ExtArgs>>): Prisma__assignmentsClient<$Result.GetResult<Prisma.$assignmentsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Assignments.
     * @param {assignmentsUpdateArgs} args - Arguments to update one Assignments.
     * @example
     * // Update one Assignments
     * const assignments = await prisma.assignments.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends assignmentsUpdateArgs>(args: SelectSubset<T, assignmentsUpdateArgs<ExtArgs>>): Prisma__assignmentsClient<$Result.GetResult<Prisma.$assignmentsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Assignments.
     * @param {assignmentsDeleteManyArgs} args - Arguments to filter Assignments to delete.
     * @example
     * // Delete a few Assignments
     * const { count } = await prisma.assignments.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends assignmentsDeleteManyArgs>(args?: SelectSubset<T, assignmentsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Assignments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {assignmentsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Assignments
     * const assignments = await prisma.assignments.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends assignmentsUpdateManyArgs>(args: SelectSubset<T, assignmentsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Assignments and returns the data updated in the database.
     * @param {assignmentsUpdateManyAndReturnArgs} args - Arguments to update many Assignments.
     * @example
     * // Update many Assignments
     * const assignments = await prisma.assignments.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Assignments and only return the `id`
     * const assignmentsWithIdOnly = await prisma.assignments.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends assignmentsUpdateManyAndReturnArgs>(args: SelectSubset<T, assignmentsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$assignmentsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Assignments.
     * @param {assignmentsUpsertArgs} args - Arguments to update or create a Assignments.
     * @example
     * // Update or create a Assignments
     * const assignments = await prisma.assignments.upsert({
     *   create: {
     *     // ... data to create a Assignments
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Assignments we want to update
     *   }
     * })
     */
    upsert<T extends assignmentsUpsertArgs>(args: SelectSubset<T, assignmentsUpsertArgs<ExtArgs>>): Prisma__assignmentsClient<$Result.GetResult<Prisma.$assignmentsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Assignments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {assignmentsCountArgs} args - Arguments to filter Assignments to count.
     * @example
     * // Count the number of Assignments
     * const count = await prisma.assignments.count({
     *   where: {
     *     // ... the filter for the Assignments we want to count
     *   }
     * })
    **/
    count<T extends assignmentsCountArgs>(
      args?: Subset<T, assignmentsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AssignmentsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Assignments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssignmentsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AssignmentsAggregateArgs>(args: Subset<T, AssignmentsAggregateArgs>): Prisma.PrismaPromise<GetAssignmentsAggregateType<T>>

    /**
     * Group by Assignments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {assignmentsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends assignmentsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: assignmentsGroupByArgs['orderBy'] }
        : { orderBy?: assignmentsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, assignmentsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAssignmentsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the assignments model
   */
  readonly fields: assignmentsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for assignments.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__assignmentsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    personnel<T extends personnelDefaultArgs<ExtArgs> = {}>(args?: Subset<T, personnelDefaultArgs<ExtArgs>>): Prisma__personnelClient<$Result.GetResult<Prisma.$personnelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    bases<T extends basesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, basesDefaultArgs<ExtArgs>>): Prisma__basesClient<$Result.GetResult<Prisma.$basesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the assignments model
   */
  interface assignmentsFieldRefs {
    readonly id: FieldRef<"assignments", 'String'>
    readonly asset_name: FieldRef<"assignments", 'String'>
    readonly assigned_to: FieldRef<"assignments", 'String'>
    readonly assigned_by: FieldRef<"assignments", 'String'>
    readonly base_id: FieldRef<"assignments", 'String'>
    readonly quantity: FieldRef<"assignments", 'Int'>
    readonly expended_quantity: FieldRef<"assignments", 'Int'>
    readonly assignment_date: FieldRef<"assignments", 'DateTime'>
    readonly status: FieldRef<"assignments", 'String'>
    readonly notes: FieldRef<"assignments", 'String'>
    readonly created_at: FieldRef<"assignments", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * assignments findUnique
   */
  export type assignmentsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the assignments
     */
    select?: assignmentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the assignments
     */
    omit?: assignmentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: assignmentsInclude<ExtArgs> | null
    /**
     * Filter, which assignments to fetch.
     */
    where: assignmentsWhereUniqueInput
  }

  /**
   * assignments findUniqueOrThrow
   */
  export type assignmentsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the assignments
     */
    select?: assignmentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the assignments
     */
    omit?: assignmentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: assignmentsInclude<ExtArgs> | null
    /**
     * Filter, which assignments to fetch.
     */
    where: assignmentsWhereUniqueInput
  }

  /**
   * assignments findFirst
   */
  export type assignmentsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the assignments
     */
    select?: assignmentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the assignments
     */
    omit?: assignmentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: assignmentsInclude<ExtArgs> | null
    /**
     * Filter, which assignments to fetch.
     */
    where?: assignmentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of assignments to fetch.
     */
    orderBy?: assignmentsOrderByWithRelationInput | assignmentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for assignments.
     */
    cursor?: assignmentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` assignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` assignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of assignments.
     */
    distinct?: AssignmentsScalarFieldEnum | AssignmentsScalarFieldEnum[]
  }

  /**
   * assignments findFirstOrThrow
   */
  export type assignmentsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the assignments
     */
    select?: assignmentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the assignments
     */
    omit?: assignmentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: assignmentsInclude<ExtArgs> | null
    /**
     * Filter, which assignments to fetch.
     */
    where?: assignmentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of assignments to fetch.
     */
    orderBy?: assignmentsOrderByWithRelationInput | assignmentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for assignments.
     */
    cursor?: assignmentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` assignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` assignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of assignments.
     */
    distinct?: AssignmentsScalarFieldEnum | AssignmentsScalarFieldEnum[]
  }

  /**
   * assignments findMany
   */
  export type assignmentsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the assignments
     */
    select?: assignmentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the assignments
     */
    omit?: assignmentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: assignmentsInclude<ExtArgs> | null
    /**
     * Filter, which assignments to fetch.
     */
    where?: assignmentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of assignments to fetch.
     */
    orderBy?: assignmentsOrderByWithRelationInput | assignmentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing assignments.
     */
    cursor?: assignmentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` assignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` assignments.
     */
    skip?: number
    distinct?: AssignmentsScalarFieldEnum | AssignmentsScalarFieldEnum[]
  }

  /**
   * assignments create
   */
  export type assignmentsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the assignments
     */
    select?: assignmentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the assignments
     */
    omit?: assignmentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: assignmentsInclude<ExtArgs> | null
    /**
     * The data needed to create a assignments.
     */
    data: XOR<assignmentsCreateInput, assignmentsUncheckedCreateInput>
  }

  /**
   * assignments createMany
   */
  export type assignmentsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many assignments.
     */
    data: assignmentsCreateManyInput | assignmentsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * assignments createManyAndReturn
   */
  export type assignmentsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the assignments
     */
    select?: assignmentsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the assignments
     */
    omit?: assignmentsOmit<ExtArgs> | null
    /**
     * The data used to create many assignments.
     */
    data: assignmentsCreateManyInput | assignmentsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: assignmentsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * assignments update
   */
  export type assignmentsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the assignments
     */
    select?: assignmentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the assignments
     */
    omit?: assignmentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: assignmentsInclude<ExtArgs> | null
    /**
     * The data needed to update a assignments.
     */
    data: XOR<assignmentsUpdateInput, assignmentsUncheckedUpdateInput>
    /**
     * Choose, which assignments to update.
     */
    where: assignmentsWhereUniqueInput
  }

  /**
   * assignments updateMany
   */
  export type assignmentsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update assignments.
     */
    data: XOR<assignmentsUpdateManyMutationInput, assignmentsUncheckedUpdateManyInput>
    /**
     * Filter which assignments to update
     */
    where?: assignmentsWhereInput
    /**
     * Limit how many assignments to update.
     */
    limit?: number
  }

  /**
   * assignments updateManyAndReturn
   */
  export type assignmentsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the assignments
     */
    select?: assignmentsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the assignments
     */
    omit?: assignmentsOmit<ExtArgs> | null
    /**
     * The data used to update assignments.
     */
    data: XOR<assignmentsUpdateManyMutationInput, assignmentsUncheckedUpdateManyInput>
    /**
     * Filter which assignments to update
     */
    where?: assignmentsWhereInput
    /**
     * Limit how many assignments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: assignmentsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * assignments upsert
   */
  export type assignmentsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the assignments
     */
    select?: assignmentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the assignments
     */
    omit?: assignmentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: assignmentsInclude<ExtArgs> | null
    /**
     * The filter to search for the assignments to update in case it exists.
     */
    where: assignmentsWhereUniqueInput
    /**
     * In case the assignments found by the `where` argument doesn't exist, create a new assignments with this data.
     */
    create: XOR<assignmentsCreateInput, assignmentsUncheckedCreateInput>
    /**
     * In case the assignments was found with the provided `where` argument, update it with this data.
     */
    update: XOR<assignmentsUpdateInput, assignmentsUncheckedUpdateInput>
  }

  /**
   * assignments delete
   */
  export type assignmentsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the assignments
     */
    select?: assignmentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the assignments
     */
    omit?: assignmentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: assignmentsInclude<ExtArgs> | null
    /**
     * Filter which assignments to delete.
     */
    where: assignmentsWhereUniqueInput
  }

  /**
   * assignments deleteMany
   */
  export type assignmentsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which assignments to delete
     */
    where?: assignmentsWhereInput
    /**
     * Limit how many assignments to delete.
     */
    limit?: number
  }

  /**
   * assignments without action
   */
  export type assignmentsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the assignments
     */
    select?: assignmentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the assignments
     */
    omit?: assignmentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: assignmentsInclude<ExtArgs> | null
  }


  /**
   * Model audit_logs
   */

  export type AggregateAudit_logs = {
    _count: Audit_logsCountAggregateOutputType | null
    _min: Audit_logsMinAggregateOutputType | null
    _max: Audit_logsMaxAggregateOutputType | null
  }

  export type Audit_logsMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    action: string | null
    table_name: string | null
    record_id: string | null
    ip_address: string | null
    user_agent: string | null
    created_at: Date | null
  }

  export type Audit_logsMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    action: string | null
    table_name: string | null
    record_id: string | null
    ip_address: string | null
    user_agent: string | null
    created_at: Date | null
  }

  export type Audit_logsCountAggregateOutputType = {
    id: number
    user_id: number
    action: number
    table_name: number
    record_id: number
    old_values: number
    new_values: number
    ip_address: number
    user_agent: number
    created_at: number
    _all: number
  }


  export type Audit_logsMinAggregateInputType = {
    id?: true
    user_id?: true
    action?: true
    table_name?: true
    record_id?: true
    ip_address?: true
    user_agent?: true
    created_at?: true
  }

  export type Audit_logsMaxAggregateInputType = {
    id?: true
    user_id?: true
    action?: true
    table_name?: true
    record_id?: true
    ip_address?: true
    user_agent?: true
    created_at?: true
  }

  export type Audit_logsCountAggregateInputType = {
    id?: true
    user_id?: true
    action?: true
    table_name?: true
    record_id?: true
    old_values?: true
    new_values?: true
    ip_address?: true
    user_agent?: true
    created_at?: true
    _all?: true
  }

  export type Audit_logsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which audit_logs to aggregate.
     */
    where?: audit_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of audit_logs to fetch.
     */
    orderBy?: audit_logsOrderByWithRelationInput | audit_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: audit_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` audit_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` audit_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned audit_logs
    **/
    _count?: true | Audit_logsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Audit_logsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Audit_logsMaxAggregateInputType
  }

  export type GetAudit_logsAggregateType<T extends Audit_logsAggregateArgs> = {
        [P in keyof T & keyof AggregateAudit_logs]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAudit_logs[P]>
      : GetScalarType<T[P], AggregateAudit_logs[P]>
  }




  export type audit_logsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: audit_logsWhereInput
    orderBy?: audit_logsOrderByWithAggregationInput | audit_logsOrderByWithAggregationInput[]
    by: Audit_logsScalarFieldEnum[] | Audit_logsScalarFieldEnum
    having?: audit_logsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Audit_logsCountAggregateInputType | true
    _min?: Audit_logsMinAggregateInputType
    _max?: Audit_logsMaxAggregateInputType
  }

  export type Audit_logsGroupByOutputType = {
    id: string
    user_id: string | null
    action: string
    table_name: string
    record_id: string | null
    old_values: JsonValue | null
    new_values: JsonValue | null
    ip_address: string | null
    user_agent: string | null
    created_at: Date | null
    _count: Audit_logsCountAggregateOutputType | null
    _min: Audit_logsMinAggregateOutputType | null
    _max: Audit_logsMaxAggregateOutputType | null
  }

  type GetAudit_logsGroupByPayload<T extends audit_logsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Audit_logsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Audit_logsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Audit_logsGroupByOutputType[P]>
            : GetScalarType<T[P], Audit_logsGroupByOutputType[P]>
        }
      >
    >


  export type audit_logsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    action?: boolean
    table_name?: boolean
    record_id?: boolean
    old_values?: boolean
    new_values?: boolean
    ip_address?: boolean
    user_agent?: boolean
    created_at?: boolean
    users?: boolean | audit_logs$usersArgs<ExtArgs>
  }, ExtArgs["result"]["audit_logs"]>

  export type audit_logsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    action?: boolean
    table_name?: boolean
    record_id?: boolean
    old_values?: boolean
    new_values?: boolean
    ip_address?: boolean
    user_agent?: boolean
    created_at?: boolean
    users?: boolean | audit_logs$usersArgs<ExtArgs>
  }, ExtArgs["result"]["audit_logs"]>

  export type audit_logsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    action?: boolean
    table_name?: boolean
    record_id?: boolean
    old_values?: boolean
    new_values?: boolean
    ip_address?: boolean
    user_agent?: boolean
    created_at?: boolean
    users?: boolean | audit_logs$usersArgs<ExtArgs>
  }, ExtArgs["result"]["audit_logs"]>

  export type audit_logsSelectScalar = {
    id?: boolean
    user_id?: boolean
    action?: boolean
    table_name?: boolean
    record_id?: boolean
    old_values?: boolean
    new_values?: boolean
    ip_address?: boolean
    user_agent?: boolean
    created_at?: boolean
  }

  export type audit_logsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "action" | "table_name" | "record_id" | "old_values" | "new_values" | "ip_address" | "user_agent" | "created_at", ExtArgs["result"]["audit_logs"]>
  export type audit_logsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | audit_logs$usersArgs<ExtArgs>
  }
  export type audit_logsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | audit_logs$usersArgs<ExtArgs>
  }
  export type audit_logsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | audit_logs$usersArgs<ExtArgs>
  }

  export type $audit_logsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "audit_logs"
    objects: {
      users: Prisma.$usersPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string | null
      action: string
      table_name: string
      record_id: string | null
      old_values: Prisma.JsonValue | null
      new_values: Prisma.JsonValue | null
      ip_address: string | null
      user_agent: string | null
      created_at: Date | null
    }, ExtArgs["result"]["audit_logs"]>
    composites: {}
  }

  type audit_logsGetPayload<S extends boolean | null | undefined | audit_logsDefaultArgs> = $Result.GetResult<Prisma.$audit_logsPayload, S>

  type audit_logsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<audit_logsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Audit_logsCountAggregateInputType | true
    }

  export interface audit_logsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['audit_logs'], meta: { name: 'audit_logs' } }
    /**
     * Find zero or one Audit_logs that matches the filter.
     * @param {audit_logsFindUniqueArgs} args - Arguments to find a Audit_logs
     * @example
     * // Get one Audit_logs
     * const audit_logs = await prisma.audit_logs.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends audit_logsFindUniqueArgs>(args: SelectSubset<T, audit_logsFindUniqueArgs<ExtArgs>>): Prisma__audit_logsClient<$Result.GetResult<Prisma.$audit_logsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Audit_logs that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {audit_logsFindUniqueOrThrowArgs} args - Arguments to find a Audit_logs
     * @example
     * // Get one Audit_logs
     * const audit_logs = await prisma.audit_logs.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends audit_logsFindUniqueOrThrowArgs>(args: SelectSubset<T, audit_logsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__audit_logsClient<$Result.GetResult<Prisma.$audit_logsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Audit_logs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {audit_logsFindFirstArgs} args - Arguments to find a Audit_logs
     * @example
     * // Get one Audit_logs
     * const audit_logs = await prisma.audit_logs.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends audit_logsFindFirstArgs>(args?: SelectSubset<T, audit_logsFindFirstArgs<ExtArgs>>): Prisma__audit_logsClient<$Result.GetResult<Prisma.$audit_logsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Audit_logs that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {audit_logsFindFirstOrThrowArgs} args - Arguments to find a Audit_logs
     * @example
     * // Get one Audit_logs
     * const audit_logs = await prisma.audit_logs.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends audit_logsFindFirstOrThrowArgs>(args?: SelectSubset<T, audit_logsFindFirstOrThrowArgs<ExtArgs>>): Prisma__audit_logsClient<$Result.GetResult<Prisma.$audit_logsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Audit_logs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {audit_logsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Audit_logs
     * const audit_logs = await prisma.audit_logs.findMany()
     * 
     * // Get first 10 Audit_logs
     * const audit_logs = await prisma.audit_logs.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const audit_logsWithIdOnly = await prisma.audit_logs.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends audit_logsFindManyArgs>(args?: SelectSubset<T, audit_logsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$audit_logsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Audit_logs.
     * @param {audit_logsCreateArgs} args - Arguments to create a Audit_logs.
     * @example
     * // Create one Audit_logs
     * const Audit_logs = await prisma.audit_logs.create({
     *   data: {
     *     // ... data to create a Audit_logs
     *   }
     * })
     * 
     */
    create<T extends audit_logsCreateArgs>(args: SelectSubset<T, audit_logsCreateArgs<ExtArgs>>): Prisma__audit_logsClient<$Result.GetResult<Prisma.$audit_logsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Audit_logs.
     * @param {audit_logsCreateManyArgs} args - Arguments to create many Audit_logs.
     * @example
     * // Create many Audit_logs
     * const audit_logs = await prisma.audit_logs.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends audit_logsCreateManyArgs>(args?: SelectSubset<T, audit_logsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Audit_logs and returns the data saved in the database.
     * @param {audit_logsCreateManyAndReturnArgs} args - Arguments to create many Audit_logs.
     * @example
     * // Create many Audit_logs
     * const audit_logs = await prisma.audit_logs.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Audit_logs and only return the `id`
     * const audit_logsWithIdOnly = await prisma.audit_logs.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends audit_logsCreateManyAndReturnArgs>(args?: SelectSubset<T, audit_logsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$audit_logsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Audit_logs.
     * @param {audit_logsDeleteArgs} args - Arguments to delete one Audit_logs.
     * @example
     * // Delete one Audit_logs
     * const Audit_logs = await prisma.audit_logs.delete({
     *   where: {
     *     // ... filter to delete one Audit_logs
     *   }
     * })
     * 
     */
    delete<T extends audit_logsDeleteArgs>(args: SelectSubset<T, audit_logsDeleteArgs<ExtArgs>>): Prisma__audit_logsClient<$Result.GetResult<Prisma.$audit_logsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Audit_logs.
     * @param {audit_logsUpdateArgs} args - Arguments to update one Audit_logs.
     * @example
     * // Update one Audit_logs
     * const audit_logs = await prisma.audit_logs.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends audit_logsUpdateArgs>(args: SelectSubset<T, audit_logsUpdateArgs<ExtArgs>>): Prisma__audit_logsClient<$Result.GetResult<Prisma.$audit_logsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Audit_logs.
     * @param {audit_logsDeleteManyArgs} args - Arguments to filter Audit_logs to delete.
     * @example
     * // Delete a few Audit_logs
     * const { count } = await prisma.audit_logs.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends audit_logsDeleteManyArgs>(args?: SelectSubset<T, audit_logsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Audit_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {audit_logsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Audit_logs
     * const audit_logs = await prisma.audit_logs.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends audit_logsUpdateManyArgs>(args: SelectSubset<T, audit_logsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Audit_logs and returns the data updated in the database.
     * @param {audit_logsUpdateManyAndReturnArgs} args - Arguments to update many Audit_logs.
     * @example
     * // Update many Audit_logs
     * const audit_logs = await prisma.audit_logs.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Audit_logs and only return the `id`
     * const audit_logsWithIdOnly = await prisma.audit_logs.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends audit_logsUpdateManyAndReturnArgs>(args: SelectSubset<T, audit_logsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$audit_logsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Audit_logs.
     * @param {audit_logsUpsertArgs} args - Arguments to update or create a Audit_logs.
     * @example
     * // Update or create a Audit_logs
     * const audit_logs = await prisma.audit_logs.upsert({
     *   create: {
     *     // ... data to create a Audit_logs
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Audit_logs we want to update
     *   }
     * })
     */
    upsert<T extends audit_logsUpsertArgs>(args: SelectSubset<T, audit_logsUpsertArgs<ExtArgs>>): Prisma__audit_logsClient<$Result.GetResult<Prisma.$audit_logsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Audit_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {audit_logsCountArgs} args - Arguments to filter Audit_logs to count.
     * @example
     * // Count the number of Audit_logs
     * const count = await prisma.audit_logs.count({
     *   where: {
     *     // ... the filter for the Audit_logs we want to count
     *   }
     * })
    **/
    count<T extends audit_logsCountArgs>(
      args?: Subset<T, audit_logsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Audit_logsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Audit_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Audit_logsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Audit_logsAggregateArgs>(args: Subset<T, Audit_logsAggregateArgs>): Prisma.PrismaPromise<GetAudit_logsAggregateType<T>>

    /**
     * Group by Audit_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {audit_logsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends audit_logsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: audit_logsGroupByArgs['orderBy'] }
        : { orderBy?: audit_logsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, audit_logsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAudit_logsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the audit_logs model
   */
  readonly fields: audit_logsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for audit_logs.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__audit_logsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends audit_logs$usersArgs<ExtArgs> = {}>(args?: Subset<T, audit_logs$usersArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the audit_logs model
   */
  interface audit_logsFieldRefs {
    readonly id: FieldRef<"audit_logs", 'String'>
    readonly user_id: FieldRef<"audit_logs", 'String'>
    readonly action: FieldRef<"audit_logs", 'String'>
    readonly table_name: FieldRef<"audit_logs", 'String'>
    readonly record_id: FieldRef<"audit_logs", 'String'>
    readonly old_values: FieldRef<"audit_logs", 'Json'>
    readonly new_values: FieldRef<"audit_logs", 'Json'>
    readonly ip_address: FieldRef<"audit_logs", 'String'>
    readonly user_agent: FieldRef<"audit_logs", 'String'>
    readonly created_at: FieldRef<"audit_logs", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * audit_logs findUnique
   */
  export type audit_logsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the audit_logs
     */
    select?: audit_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the audit_logs
     */
    omit?: audit_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: audit_logsInclude<ExtArgs> | null
    /**
     * Filter, which audit_logs to fetch.
     */
    where: audit_logsWhereUniqueInput
  }

  /**
   * audit_logs findUniqueOrThrow
   */
  export type audit_logsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the audit_logs
     */
    select?: audit_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the audit_logs
     */
    omit?: audit_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: audit_logsInclude<ExtArgs> | null
    /**
     * Filter, which audit_logs to fetch.
     */
    where: audit_logsWhereUniqueInput
  }

  /**
   * audit_logs findFirst
   */
  export type audit_logsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the audit_logs
     */
    select?: audit_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the audit_logs
     */
    omit?: audit_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: audit_logsInclude<ExtArgs> | null
    /**
     * Filter, which audit_logs to fetch.
     */
    where?: audit_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of audit_logs to fetch.
     */
    orderBy?: audit_logsOrderByWithRelationInput | audit_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for audit_logs.
     */
    cursor?: audit_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` audit_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` audit_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of audit_logs.
     */
    distinct?: Audit_logsScalarFieldEnum | Audit_logsScalarFieldEnum[]
  }

  /**
   * audit_logs findFirstOrThrow
   */
  export type audit_logsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the audit_logs
     */
    select?: audit_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the audit_logs
     */
    omit?: audit_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: audit_logsInclude<ExtArgs> | null
    /**
     * Filter, which audit_logs to fetch.
     */
    where?: audit_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of audit_logs to fetch.
     */
    orderBy?: audit_logsOrderByWithRelationInput | audit_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for audit_logs.
     */
    cursor?: audit_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` audit_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` audit_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of audit_logs.
     */
    distinct?: Audit_logsScalarFieldEnum | Audit_logsScalarFieldEnum[]
  }

  /**
   * audit_logs findMany
   */
  export type audit_logsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the audit_logs
     */
    select?: audit_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the audit_logs
     */
    omit?: audit_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: audit_logsInclude<ExtArgs> | null
    /**
     * Filter, which audit_logs to fetch.
     */
    where?: audit_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of audit_logs to fetch.
     */
    orderBy?: audit_logsOrderByWithRelationInput | audit_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing audit_logs.
     */
    cursor?: audit_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` audit_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` audit_logs.
     */
    skip?: number
    distinct?: Audit_logsScalarFieldEnum | Audit_logsScalarFieldEnum[]
  }

  /**
   * audit_logs create
   */
  export type audit_logsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the audit_logs
     */
    select?: audit_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the audit_logs
     */
    omit?: audit_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: audit_logsInclude<ExtArgs> | null
    /**
     * The data needed to create a audit_logs.
     */
    data: XOR<audit_logsCreateInput, audit_logsUncheckedCreateInput>
  }

  /**
   * audit_logs createMany
   */
  export type audit_logsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many audit_logs.
     */
    data: audit_logsCreateManyInput | audit_logsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * audit_logs createManyAndReturn
   */
  export type audit_logsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the audit_logs
     */
    select?: audit_logsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the audit_logs
     */
    omit?: audit_logsOmit<ExtArgs> | null
    /**
     * The data used to create many audit_logs.
     */
    data: audit_logsCreateManyInput | audit_logsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: audit_logsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * audit_logs update
   */
  export type audit_logsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the audit_logs
     */
    select?: audit_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the audit_logs
     */
    omit?: audit_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: audit_logsInclude<ExtArgs> | null
    /**
     * The data needed to update a audit_logs.
     */
    data: XOR<audit_logsUpdateInput, audit_logsUncheckedUpdateInput>
    /**
     * Choose, which audit_logs to update.
     */
    where: audit_logsWhereUniqueInput
  }

  /**
   * audit_logs updateMany
   */
  export type audit_logsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update audit_logs.
     */
    data: XOR<audit_logsUpdateManyMutationInput, audit_logsUncheckedUpdateManyInput>
    /**
     * Filter which audit_logs to update
     */
    where?: audit_logsWhereInput
    /**
     * Limit how many audit_logs to update.
     */
    limit?: number
  }

  /**
   * audit_logs updateManyAndReturn
   */
  export type audit_logsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the audit_logs
     */
    select?: audit_logsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the audit_logs
     */
    omit?: audit_logsOmit<ExtArgs> | null
    /**
     * The data used to update audit_logs.
     */
    data: XOR<audit_logsUpdateManyMutationInput, audit_logsUncheckedUpdateManyInput>
    /**
     * Filter which audit_logs to update
     */
    where?: audit_logsWhereInput
    /**
     * Limit how many audit_logs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: audit_logsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * audit_logs upsert
   */
  export type audit_logsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the audit_logs
     */
    select?: audit_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the audit_logs
     */
    omit?: audit_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: audit_logsInclude<ExtArgs> | null
    /**
     * The filter to search for the audit_logs to update in case it exists.
     */
    where: audit_logsWhereUniqueInput
    /**
     * In case the audit_logs found by the `where` argument doesn't exist, create a new audit_logs with this data.
     */
    create: XOR<audit_logsCreateInput, audit_logsUncheckedCreateInput>
    /**
     * In case the audit_logs was found with the provided `where` argument, update it with this data.
     */
    update: XOR<audit_logsUpdateInput, audit_logsUncheckedUpdateInput>
  }

  /**
   * audit_logs delete
   */
  export type audit_logsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the audit_logs
     */
    select?: audit_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the audit_logs
     */
    omit?: audit_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: audit_logsInclude<ExtArgs> | null
    /**
     * Filter which audit_logs to delete.
     */
    where: audit_logsWhereUniqueInput
  }

  /**
   * audit_logs deleteMany
   */
  export type audit_logsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which audit_logs to delete
     */
    where?: audit_logsWhereInput
    /**
     * Limit how many audit_logs to delete.
     */
    limit?: number
  }

  /**
   * audit_logs.users
   */
  export type audit_logs$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    where?: usersWhereInput
  }

  /**
   * audit_logs without action
   */
  export type audit_logsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the audit_logs
     */
    select?: audit_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the audit_logs
     */
    omit?: audit_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: audit_logsInclude<ExtArgs> | null
  }


  /**
   * Model bases
   */

  export type AggregateBases = {
    _count: BasesCountAggregateOutputType | null
    _min: BasesMinAggregateOutputType | null
    _max: BasesMaxAggregateOutputType | null
  }

  export type BasesMinAggregateOutputType = {
    id: string | null
    name: string | null
    code: string | null
    location: string | null
    commander_id: string | null
    is_active: boolean | null
    created_at: Date | null
  }

  export type BasesMaxAggregateOutputType = {
    id: string | null
    name: string | null
    code: string | null
    location: string | null
    commander_id: string | null
    is_active: boolean | null
    created_at: Date | null
  }

  export type BasesCountAggregateOutputType = {
    id: number
    name: number
    code: number
    location: number
    commander_id: number
    is_active: number
    created_at: number
    _all: number
  }


  export type BasesMinAggregateInputType = {
    id?: true
    name?: true
    code?: true
    location?: true
    commander_id?: true
    is_active?: true
    created_at?: true
  }

  export type BasesMaxAggregateInputType = {
    id?: true
    name?: true
    code?: true
    location?: true
    commander_id?: true
    is_active?: true
    created_at?: true
  }

  export type BasesCountAggregateInputType = {
    id?: true
    name?: true
    code?: true
    location?: true
    commander_id?: true
    is_active?: true
    created_at?: true
    _all?: true
  }

  export type BasesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which bases to aggregate.
     */
    where?: basesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bases to fetch.
     */
    orderBy?: basesOrderByWithRelationInput | basesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: basesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned bases
    **/
    _count?: true | BasesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BasesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BasesMaxAggregateInputType
  }

  export type GetBasesAggregateType<T extends BasesAggregateArgs> = {
        [P in keyof T & keyof AggregateBases]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBases[P]>
      : GetScalarType<T[P], AggregateBases[P]>
  }




  export type basesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: basesWhereInput
    orderBy?: basesOrderByWithAggregationInput | basesOrderByWithAggregationInput[]
    by: BasesScalarFieldEnum[] | BasesScalarFieldEnum
    having?: basesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BasesCountAggregateInputType | true
    _min?: BasesMinAggregateInputType
    _max?: BasesMaxAggregateInputType
  }

  export type BasesGroupByOutputType = {
    id: string
    name: string
    code: string
    location: string
    commander_id: string | null
    is_active: boolean | null
    created_at: Date | null
    _count: BasesCountAggregateOutputType | null
    _min: BasesMinAggregateOutputType | null
    _max: BasesMaxAggregateOutputType | null
  }

  type GetBasesGroupByPayload<T extends basesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BasesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BasesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BasesGroupByOutputType[P]>
            : GetScalarType<T[P], BasesGroupByOutputType[P]>
        }
      >
    >


  export type basesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    code?: boolean
    location?: boolean
    commander_id?: boolean
    is_active?: boolean
    created_at?: boolean
    assets?: boolean | bases$assetsArgs<ExtArgs>
    assignments?: boolean | bases$assignmentsArgs<ExtArgs>
    users_bases_commander_idTousers?: boolean | bases$users_bases_commander_idTousersArgs<ExtArgs>
    expenditures?: boolean | bases$expendituresArgs<ExtArgs>
    personnel?: boolean | bases$personnelArgs<ExtArgs>
    purchases?: boolean | bases$purchasesArgs<ExtArgs>
    transfers_transfers_from_base_idTobases?: boolean | bases$transfers_transfers_from_base_idTobasesArgs<ExtArgs>
    transfers_transfers_to_base_idTobases?: boolean | bases$transfers_transfers_to_base_idTobasesArgs<ExtArgs>
    users_users_base_idTobases?: boolean | bases$users_users_base_idTobasesArgs<ExtArgs>
    _count?: boolean | BasesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bases"]>

  export type basesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    code?: boolean
    location?: boolean
    commander_id?: boolean
    is_active?: boolean
    created_at?: boolean
    users_bases_commander_idTousers?: boolean | bases$users_bases_commander_idTousersArgs<ExtArgs>
  }, ExtArgs["result"]["bases"]>

  export type basesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    code?: boolean
    location?: boolean
    commander_id?: boolean
    is_active?: boolean
    created_at?: boolean
    users_bases_commander_idTousers?: boolean | bases$users_bases_commander_idTousersArgs<ExtArgs>
  }, ExtArgs["result"]["bases"]>

  export type basesSelectScalar = {
    id?: boolean
    name?: boolean
    code?: boolean
    location?: boolean
    commander_id?: boolean
    is_active?: boolean
    created_at?: boolean
  }

  export type basesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "code" | "location" | "commander_id" | "is_active" | "created_at", ExtArgs["result"]["bases"]>
  export type basesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assets?: boolean | bases$assetsArgs<ExtArgs>
    assignments?: boolean | bases$assignmentsArgs<ExtArgs>
    users_bases_commander_idTousers?: boolean | bases$users_bases_commander_idTousersArgs<ExtArgs>
    expenditures?: boolean | bases$expendituresArgs<ExtArgs>
    personnel?: boolean | bases$personnelArgs<ExtArgs>
    purchases?: boolean | bases$purchasesArgs<ExtArgs>
    transfers_transfers_from_base_idTobases?: boolean | bases$transfers_transfers_from_base_idTobasesArgs<ExtArgs>
    transfers_transfers_to_base_idTobases?: boolean | bases$transfers_transfers_to_base_idTobasesArgs<ExtArgs>
    users_users_base_idTobases?: boolean | bases$users_users_base_idTobasesArgs<ExtArgs>
    _count?: boolean | BasesCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type basesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users_bases_commander_idTousers?: boolean | bases$users_bases_commander_idTousersArgs<ExtArgs>
  }
  export type basesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users_bases_commander_idTousers?: boolean | bases$users_bases_commander_idTousersArgs<ExtArgs>
  }

  export type $basesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "bases"
    objects: {
      assets: Prisma.$assetsPayload<ExtArgs>[]
      assignments: Prisma.$assignmentsPayload<ExtArgs>[]
      users_bases_commander_idTousers: Prisma.$usersPayload<ExtArgs> | null
      expenditures: Prisma.$expendituresPayload<ExtArgs>[]
      personnel: Prisma.$personnelPayload<ExtArgs>[]
      purchases: Prisma.$purchasesPayload<ExtArgs>[]
      transfers_transfers_from_base_idTobases: Prisma.$transfersPayload<ExtArgs>[]
      transfers_transfers_to_base_idTobases: Prisma.$transfersPayload<ExtArgs>[]
      users_users_base_idTobases: Prisma.$usersPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      code: string
      location: string
      commander_id: string | null
      is_active: boolean | null
      created_at: Date | null
    }, ExtArgs["result"]["bases"]>
    composites: {}
  }

  type basesGetPayload<S extends boolean | null | undefined | basesDefaultArgs> = $Result.GetResult<Prisma.$basesPayload, S>

  type basesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<basesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BasesCountAggregateInputType | true
    }

  export interface basesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['bases'], meta: { name: 'bases' } }
    /**
     * Find zero or one Bases that matches the filter.
     * @param {basesFindUniqueArgs} args - Arguments to find a Bases
     * @example
     * // Get one Bases
     * const bases = await prisma.bases.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends basesFindUniqueArgs>(args: SelectSubset<T, basesFindUniqueArgs<ExtArgs>>): Prisma__basesClient<$Result.GetResult<Prisma.$basesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Bases that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {basesFindUniqueOrThrowArgs} args - Arguments to find a Bases
     * @example
     * // Get one Bases
     * const bases = await prisma.bases.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends basesFindUniqueOrThrowArgs>(args: SelectSubset<T, basesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__basesClient<$Result.GetResult<Prisma.$basesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bases that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {basesFindFirstArgs} args - Arguments to find a Bases
     * @example
     * // Get one Bases
     * const bases = await prisma.bases.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends basesFindFirstArgs>(args?: SelectSubset<T, basesFindFirstArgs<ExtArgs>>): Prisma__basesClient<$Result.GetResult<Prisma.$basesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bases that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {basesFindFirstOrThrowArgs} args - Arguments to find a Bases
     * @example
     * // Get one Bases
     * const bases = await prisma.bases.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends basesFindFirstOrThrowArgs>(args?: SelectSubset<T, basesFindFirstOrThrowArgs<ExtArgs>>): Prisma__basesClient<$Result.GetResult<Prisma.$basesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Bases that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {basesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bases
     * const bases = await prisma.bases.findMany()
     * 
     * // Get first 10 Bases
     * const bases = await prisma.bases.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const basesWithIdOnly = await prisma.bases.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends basesFindManyArgs>(args?: SelectSubset<T, basesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$basesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Bases.
     * @param {basesCreateArgs} args - Arguments to create a Bases.
     * @example
     * // Create one Bases
     * const Bases = await prisma.bases.create({
     *   data: {
     *     // ... data to create a Bases
     *   }
     * })
     * 
     */
    create<T extends basesCreateArgs>(args: SelectSubset<T, basesCreateArgs<ExtArgs>>): Prisma__basesClient<$Result.GetResult<Prisma.$basesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Bases.
     * @param {basesCreateManyArgs} args - Arguments to create many Bases.
     * @example
     * // Create many Bases
     * const bases = await prisma.bases.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends basesCreateManyArgs>(args?: SelectSubset<T, basesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bases and returns the data saved in the database.
     * @param {basesCreateManyAndReturnArgs} args - Arguments to create many Bases.
     * @example
     * // Create many Bases
     * const bases = await prisma.bases.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bases and only return the `id`
     * const basesWithIdOnly = await prisma.bases.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends basesCreateManyAndReturnArgs>(args?: SelectSubset<T, basesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$basesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Bases.
     * @param {basesDeleteArgs} args - Arguments to delete one Bases.
     * @example
     * // Delete one Bases
     * const Bases = await prisma.bases.delete({
     *   where: {
     *     // ... filter to delete one Bases
     *   }
     * })
     * 
     */
    delete<T extends basesDeleteArgs>(args: SelectSubset<T, basesDeleteArgs<ExtArgs>>): Prisma__basesClient<$Result.GetResult<Prisma.$basesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Bases.
     * @param {basesUpdateArgs} args - Arguments to update one Bases.
     * @example
     * // Update one Bases
     * const bases = await prisma.bases.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends basesUpdateArgs>(args: SelectSubset<T, basesUpdateArgs<ExtArgs>>): Prisma__basesClient<$Result.GetResult<Prisma.$basesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Bases.
     * @param {basesDeleteManyArgs} args - Arguments to filter Bases to delete.
     * @example
     * // Delete a few Bases
     * const { count } = await prisma.bases.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends basesDeleteManyArgs>(args?: SelectSubset<T, basesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {basesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bases
     * const bases = await prisma.bases.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends basesUpdateManyArgs>(args: SelectSubset<T, basesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bases and returns the data updated in the database.
     * @param {basesUpdateManyAndReturnArgs} args - Arguments to update many Bases.
     * @example
     * // Update many Bases
     * const bases = await prisma.bases.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Bases and only return the `id`
     * const basesWithIdOnly = await prisma.bases.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends basesUpdateManyAndReturnArgs>(args: SelectSubset<T, basesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$basesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Bases.
     * @param {basesUpsertArgs} args - Arguments to update or create a Bases.
     * @example
     * // Update or create a Bases
     * const bases = await prisma.bases.upsert({
     *   create: {
     *     // ... data to create a Bases
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Bases we want to update
     *   }
     * })
     */
    upsert<T extends basesUpsertArgs>(args: SelectSubset<T, basesUpsertArgs<ExtArgs>>): Prisma__basesClient<$Result.GetResult<Prisma.$basesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Bases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {basesCountArgs} args - Arguments to filter Bases to count.
     * @example
     * // Count the number of Bases
     * const count = await prisma.bases.count({
     *   where: {
     *     // ... the filter for the Bases we want to count
     *   }
     * })
    **/
    count<T extends basesCountArgs>(
      args?: Subset<T, basesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BasesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Bases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BasesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BasesAggregateArgs>(args: Subset<T, BasesAggregateArgs>): Prisma.PrismaPromise<GetBasesAggregateType<T>>

    /**
     * Group by Bases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {basesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends basesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: basesGroupByArgs['orderBy'] }
        : { orderBy?: basesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, basesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBasesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the bases model
   */
  readonly fields: basesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for bases.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__basesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    assets<T extends bases$assetsArgs<ExtArgs> = {}>(args?: Subset<T, bases$assetsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$assetsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    assignments<T extends bases$assignmentsArgs<ExtArgs> = {}>(args?: Subset<T, bases$assignmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$assignmentsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    users_bases_commander_idTousers<T extends bases$users_bases_commander_idTousersArgs<ExtArgs> = {}>(args?: Subset<T, bases$users_bases_commander_idTousersArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    expenditures<T extends bases$expendituresArgs<ExtArgs> = {}>(args?: Subset<T, bases$expendituresArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$expendituresPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    personnel<T extends bases$personnelArgs<ExtArgs> = {}>(args?: Subset<T, bases$personnelArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$personnelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    purchases<T extends bases$purchasesArgs<ExtArgs> = {}>(args?: Subset<T, bases$purchasesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$purchasesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    transfers_transfers_from_base_idTobases<T extends bases$transfers_transfers_from_base_idTobasesArgs<ExtArgs> = {}>(args?: Subset<T, bases$transfers_transfers_from_base_idTobasesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$transfersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    transfers_transfers_to_base_idTobases<T extends bases$transfers_transfers_to_base_idTobasesArgs<ExtArgs> = {}>(args?: Subset<T, bases$transfers_transfers_to_base_idTobasesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$transfersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    users_users_base_idTobases<T extends bases$users_users_base_idTobasesArgs<ExtArgs> = {}>(args?: Subset<T, bases$users_users_base_idTobasesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the bases model
   */
  interface basesFieldRefs {
    readonly id: FieldRef<"bases", 'String'>
    readonly name: FieldRef<"bases", 'String'>
    readonly code: FieldRef<"bases", 'String'>
    readonly location: FieldRef<"bases", 'String'>
    readonly commander_id: FieldRef<"bases", 'String'>
    readonly is_active: FieldRef<"bases", 'Boolean'>
    readonly created_at: FieldRef<"bases", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * bases findUnique
   */
  export type basesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bases
     */
    select?: basesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bases
     */
    omit?: basesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: basesInclude<ExtArgs> | null
    /**
     * Filter, which bases to fetch.
     */
    where: basesWhereUniqueInput
  }

  /**
   * bases findUniqueOrThrow
   */
  export type basesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bases
     */
    select?: basesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bases
     */
    omit?: basesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: basesInclude<ExtArgs> | null
    /**
     * Filter, which bases to fetch.
     */
    where: basesWhereUniqueInput
  }

  /**
   * bases findFirst
   */
  export type basesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bases
     */
    select?: basesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bases
     */
    omit?: basesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: basesInclude<ExtArgs> | null
    /**
     * Filter, which bases to fetch.
     */
    where?: basesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bases to fetch.
     */
    orderBy?: basesOrderByWithRelationInput | basesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for bases.
     */
    cursor?: basesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of bases.
     */
    distinct?: BasesScalarFieldEnum | BasesScalarFieldEnum[]
  }

  /**
   * bases findFirstOrThrow
   */
  export type basesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bases
     */
    select?: basesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bases
     */
    omit?: basesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: basesInclude<ExtArgs> | null
    /**
     * Filter, which bases to fetch.
     */
    where?: basesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bases to fetch.
     */
    orderBy?: basesOrderByWithRelationInput | basesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for bases.
     */
    cursor?: basesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of bases.
     */
    distinct?: BasesScalarFieldEnum | BasesScalarFieldEnum[]
  }

  /**
   * bases findMany
   */
  export type basesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bases
     */
    select?: basesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bases
     */
    omit?: basesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: basesInclude<ExtArgs> | null
    /**
     * Filter, which bases to fetch.
     */
    where?: basesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bases to fetch.
     */
    orderBy?: basesOrderByWithRelationInput | basesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing bases.
     */
    cursor?: basesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bases.
     */
    skip?: number
    distinct?: BasesScalarFieldEnum | BasesScalarFieldEnum[]
  }

  /**
   * bases create
   */
  export type basesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bases
     */
    select?: basesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bases
     */
    omit?: basesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: basesInclude<ExtArgs> | null
    /**
     * The data needed to create a bases.
     */
    data: XOR<basesCreateInput, basesUncheckedCreateInput>
  }

  /**
   * bases createMany
   */
  export type basesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many bases.
     */
    data: basesCreateManyInput | basesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * bases createManyAndReturn
   */
  export type basesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bases
     */
    select?: basesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the bases
     */
    omit?: basesOmit<ExtArgs> | null
    /**
     * The data used to create many bases.
     */
    data: basesCreateManyInput | basesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: basesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * bases update
   */
  export type basesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bases
     */
    select?: basesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bases
     */
    omit?: basesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: basesInclude<ExtArgs> | null
    /**
     * The data needed to update a bases.
     */
    data: XOR<basesUpdateInput, basesUncheckedUpdateInput>
    /**
     * Choose, which bases to update.
     */
    where: basesWhereUniqueInput
  }

  /**
   * bases updateMany
   */
  export type basesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update bases.
     */
    data: XOR<basesUpdateManyMutationInput, basesUncheckedUpdateManyInput>
    /**
     * Filter which bases to update
     */
    where?: basesWhereInput
    /**
     * Limit how many bases to update.
     */
    limit?: number
  }

  /**
   * bases updateManyAndReturn
   */
  export type basesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bases
     */
    select?: basesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the bases
     */
    omit?: basesOmit<ExtArgs> | null
    /**
     * The data used to update bases.
     */
    data: XOR<basesUpdateManyMutationInput, basesUncheckedUpdateManyInput>
    /**
     * Filter which bases to update
     */
    where?: basesWhereInput
    /**
     * Limit how many bases to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: basesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * bases upsert
   */
  export type basesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bases
     */
    select?: basesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bases
     */
    omit?: basesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: basesInclude<ExtArgs> | null
    /**
     * The filter to search for the bases to update in case it exists.
     */
    where: basesWhereUniqueInput
    /**
     * In case the bases found by the `where` argument doesn't exist, create a new bases with this data.
     */
    create: XOR<basesCreateInput, basesUncheckedCreateInput>
    /**
     * In case the bases was found with the provided `where` argument, update it with this data.
     */
    update: XOR<basesUpdateInput, basesUncheckedUpdateInput>
  }

  /**
   * bases delete
   */
  export type basesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bases
     */
    select?: basesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bases
     */
    omit?: basesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: basesInclude<ExtArgs> | null
    /**
     * Filter which bases to delete.
     */
    where: basesWhereUniqueInput
  }

  /**
   * bases deleteMany
   */
  export type basesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which bases to delete
     */
    where?: basesWhereInput
    /**
     * Limit how many bases to delete.
     */
    limit?: number
  }

  /**
   * bases.assets
   */
  export type bases$assetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the assets
     */
    select?: assetsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the assets
     */
    omit?: assetsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: assetsInclude<ExtArgs> | null
    where?: assetsWhereInput
    orderBy?: assetsOrderByWithRelationInput | assetsOrderByWithRelationInput[]
    cursor?: assetsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AssetsScalarFieldEnum | AssetsScalarFieldEnum[]
  }

  /**
   * bases.assignments
   */
  export type bases$assignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the assignments
     */
    select?: assignmentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the assignments
     */
    omit?: assignmentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: assignmentsInclude<ExtArgs> | null
    where?: assignmentsWhereInput
    orderBy?: assignmentsOrderByWithRelationInput | assignmentsOrderByWithRelationInput[]
    cursor?: assignmentsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AssignmentsScalarFieldEnum | AssignmentsScalarFieldEnum[]
  }

  /**
   * bases.users_bases_commander_idTousers
   */
  export type bases$users_bases_commander_idTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    where?: usersWhereInput
  }

  /**
   * bases.expenditures
   */
  export type bases$expendituresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the expenditures
     */
    select?: expendituresSelect<ExtArgs> | null
    /**
     * Omit specific fields from the expenditures
     */
    omit?: expendituresOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: expendituresInclude<ExtArgs> | null
    where?: expendituresWhereInput
    orderBy?: expendituresOrderByWithRelationInput | expendituresOrderByWithRelationInput[]
    cursor?: expendituresWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExpendituresScalarFieldEnum | ExpendituresScalarFieldEnum[]
  }

  /**
   * bases.personnel
   */
  export type bases$personnelArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the personnel
     */
    select?: personnelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the personnel
     */
    omit?: personnelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: personnelInclude<ExtArgs> | null
    where?: personnelWhereInput
    orderBy?: personnelOrderByWithRelationInput | personnelOrderByWithRelationInput[]
    cursor?: personnelWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PersonnelScalarFieldEnum | PersonnelScalarFieldEnum[]
  }

  /**
   * bases.purchases
   */
  export type bases$purchasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the purchases
     */
    select?: purchasesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the purchases
     */
    omit?: purchasesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: purchasesInclude<ExtArgs> | null
    where?: purchasesWhereInput
    orderBy?: purchasesOrderByWithRelationInput | purchasesOrderByWithRelationInput[]
    cursor?: purchasesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PurchasesScalarFieldEnum | PurchasesScalarFieldEnum[]
  }

  /**
   * bases.transfers_transfers_from_base_idTobases
   */
  export type bases$transfers_transfers_from_base_idTobasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transfers
     */
    select?: transfersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transfers
     */
    omit?: transfersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transfersInclude<ExtArgs> | null
    where?: transfersWhereInput
    orderBy?: transfersOrderByWithRelationInput | transfersOrderByWithRelationInput[]
    cursor?: transfersWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransfersScalarFieldEnum | TransfersScalarFieldEnum[]
  }

  /**
   * bases.transfers_transfers_to_base_idTobases
   */
  export type bases$transfers_transfers_to_base_idTobasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transfers
     */
    select?: transfersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transfers
     */
    omit?: transfersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transfersInclude<ExtArgs> | null
    where?: transfersWhereInput
    orderBy?: transfersOrderByWithRelationInput | transfersOrderByWithRelationInput[]
    cursor?: transfersWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransfersScalarFieldEnum | TransfersScalarFieldEnum[]
  }

  /**
   * bases.users_users_base_idTobases
   */
  export type bases$users_users_base_idTobasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    where?: usersWhereInput
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    cursor?: usersWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * bases without action
   */
  export type basesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bases
     */
    select?: basesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bases
     */
    omit?: basesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: basesInclude<ExtArgs> | null
  }


  /**
   * Model expenditures
   */

  export type AggregateExpenditures = {
    _count: ExpendituresCountAggregateOutputType | null
    _avg: ExpendituresAvgAggregateOutputType | null
    _sum: ExpendituresSumAggregateOutputType | null
    _min: ExpendituresMinAggregateOutputType | null
    _max: ExpendituresMaxAggregateOutputType | null
  }

  export type ExpendituresAvgAggregateOutputType = {
    quantity: number | null
  }

  export type ExpendituresSumAggregateOutputType = {
    quantity: number | null
  }

  export type ExpendituresMinAggregateOutputType = {
    id: string | null
    asset_name: string | null
    base_id: string | null
    personnel_id: string | null
    quantity: number | null
    expenditure_date: Date | null
    reason: string | null
    authorized_by: string | null
    notes: string | null
    created_by: string | null
    created_at: Date | null
  }

  export type ExpendituresMaxAggregateOutputType = {
    id: string | null
    asset_name: string | null
    base_id: string | null
    personnel_id: string | null
    quantity: number | null
    expenditure_date: Date | null
    reason: string | null
    authorized_by: string | null
    notes: string | null
    created_by: string | null
    created_at: Date | null
  }

  export type ExpendituresCountAggregateOutputType = {
    id: number
    asset_name: number
    base_id: number
    personnel_id: number
    quantity: number
    expenditure_date: number
    reason: number
    authorized_by: number
    notes: number
    created_by: number
    created_at: number
    _all: number
  }


  export type ExpendituresAvgAggregateInputType = {
    quantity?: true
  }

  export type ExpendituresSumAggregateInputType = {
    quantity?: true
  }

  export type ExpendituresMinAggregateInputType = {
    id?: true
    asset_name?: true
    base_id?: true
    personnel_id?: true
    quantity?: true
    expenditure_date?: true
    reason?: true
    authorized_by?: true
    notes?: true
    created_by?: true
    created_at?: true
  }

  export type ExpendituresMaxAggregateInputType = {
    id?: true
    asset_name?: true
    base_id?: true
    personnel_id?: true
    quantity?: true
    expenditure_date?: true
    reason?: true
    authorized_by?: true
    notes?: true
    created_by?: true
    created_at?: true
  }

  export type ExpendituresCountAggregateInputType = {
    id?: true
    asset_name?: true
    base_id?: true
    personnel_id?: true
    quantity?: true
    expenditure_date?: true
    reason?: true
    authorized_by?: true
    notes?: true
    created_by?: true
    created_at?: true
    _all?: true
  }

  export type ExpendituresAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which expenditures to aggregate.
     */
    where?: expendituresWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of expenditures to fetch.
     */
    orderBy?: expendituresOrderByWithRelationInput | expendituresOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: expendituresWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` expenditures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` expenditures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned expenditures
    **/
    _count?: true | ExpendituresCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExpendituresAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExpendituresSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExpendituresMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExpendituresMaxAggregateInputType
  }

  export type GetExpendituresAggregateType<T extends ExpendituresAggregateArgs> = {
        [P in keyof T & keyof AggregateExpenditures]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExpenditures[P]>
      : GetScalarType<T[P], AggregateExpenditures[P]>
  }




  export type expendituresGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: expendituresWhereInput
    orderBy?: expendituresOrderByWithAggregationInput | expendituresOrderByWithAggregationInput[]
    by: ExpendituresScalarFieldEnum[] | ExpendituresScalarFieldEnum
    having?: expendituresScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExpendituresCountAggregateInputType | true
    _avg?: ExpendituresAvgAggregateInputType
    _sum?: ExpendituresSumAggregateInputType
    _min?: ExpendituresMinAggregateInputType
    _max?: ExpendituresMaxAggregateInputType
  }

  export type ExpendituresGroupByOutputType = {
    id: string
    asset_name: string
    base_id: string
    personnel_id: string | null
    quantity: number
    expenditure_date: Date
    reason: string
    authorized_by: string | null
    notes: string | null
    created_by: string
    created_at: Date | null
    _count: ExpendituresCountAggregateOutputType | null
    _avg: ExpendituresAvgAggregateOutputType | null
    _sum: ExpendituresSumAggregateOutputType | null
    _min: ExpendituresMinAggregateOutputType | null
    _max: ExpendituresMaxAggregateOutputType | null
  }

  type GetExpendituresGroupByPayload<T extends expendituresGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExpendituresGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExpendituresGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExpendituresGroupByOutputType[P]>
            : GetScalarType<T[P], ExpendituresGroupByOutputType[P]>
        }
      >
    >


  export type expendituresSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    asset_name?: boolean
    base_id?: boolean
    personnel_id?: boolean
    quantity?: boolean
    expenditure_date?: boolean
    reason?: boolean
    authorized_by?: boolean
    notes?: boolean
    created_by?: boolean
    created_at?: boolean
    users_expenditures_authorized_byTousers?: boolean | expenditures$users_expenditures_authorized_byTousersArgs<ExtArgs>
    bases?: boolean | basesDefaultArgs<ExtArgs>
    users_expenditures_created_byTousers?: boolean | usersDefaultArgs<ExtArgs>
    personnel?: boolean | expenditures$personnelArgs<ExtArgs>
  }, ExtArgs["result"]["expenditures"]>

  export type expendituresSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    asset_name?: boolean
    base_id?: boolean
    personnel_id?: boolean
    quantity?: boolean
    expenditure_date?: boolean
    reason?: boolean
    authorized_by?: boolean
    notes?: boolean
    created_by?: boolean
    created_at?: boolean
    users_expenditures_authorized_byTousers?: boolean | expenditures$users_expenditures_authorized_byTousersArgs<ExtArgs>
    bases?: boolean | basesDefaultArgs<ExtArgs>
    users_expenditures_created_byTousers?: boolean | usersDefaultArgs<ExtArgs>
    personnel?: boolean | expenditures$personnelArgs<ExtArgs>
  }, ExtArgs["result"]["expenditures"]>

  export type expendituresSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    asset_name?: boolean
    base_id?: boolean
    personnel_id?: boolean
    quantity?: boolean
    expenditure_date?: boolean
    reason?: boolean
    authorized_by?: boolean
    notes?: boolean
    created_by?: boolean
    created_at?: boolean
    users_expenditures_authorized_byTousers?: boolean | expenditures$users_expenditures_authorized_byTousersArgs<ExtArgs>
    bases?: boolean | basesDefaultArgs<ExtArgs>
    users_expenditures_created_byTousers?: boolean | usersDefaultArgs<ExtArgs>
    personnel?: boolean | expenditures$personnelArgs<ExtArgs>
  }, ExtArgs["result"]["expenditures"]>

  export type expendituresSelectScalar = {
    id?: boolean
    asset_name?: boolean
    base_id?: boolean
    personnel_id?: boolean
    quantity?: boolean
    expenditure_date?: boolean
    reason?: boolean
    authorized_by?: boolean
    notes?: boolean
    created_by?: boolean
    created_at?: boolean
  }

  export type expendituresOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "asset_name" | "base_id" | "personnel_id" | "quantity" | "expenditure_date" | "reason" | "authorized_by" | "notes" | "created_by" | "created_at", ExtArgs["result"]["expenditures"]>
  export type expendituresInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users_expenditures_authorized_byTousers?: boolean | expenditures$users_expenditures_authorized_byTousersArgs<ExtArgs>
    bases?: boolean | basesDefaultArgs<ExtArgs>
    users_expenditures_created_byTousers?: boolean | usersDefaultArgs<ExtArgs>
    personnel?: boolean | expenditures$personnelArgs<ExtArgs>
  }
  export type expendituresIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users_expenditures_authorized_byTousers?: boolean | expenditures$users_expenditures_authorized_byTousersArgs<ExtArgs>
    bases?: boolean | basesDefaultArgs<ExtArgs>
    users_expenditures_created_byTousers?: boolean | usersDefaultArgs<ExtArgs>
    personnel?: boolean | expenditures$personnelArgs<ExtArgs>
  }
  export type expendituresIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users_expenditures_authorized_byTousers?: boolean | expenditures$users_expenditures_authorized_byTousersArgs<ExtArgs>
    bases?: boolean | basesDefaultArgs<ExtArgs>
    users_expenditures_created_byTousers?: boolean | usersDefaultArgs<ExtArgs>
    personnel?: boolean | expenditures$personnelArgs<ExtArgs>
  }

  export type $expendituresPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "expenditures"
    objects: {
      users_expenditures_authorized_byTousers: Prisma.$usersPayload<ExtArgs> | null
      bases: Prisma.$basesPayload<ExtArgs>
      users_expenditures_created_byTousers: Prisma.$usersPayload<ExtArgs>
      personnel: Prisma.$personnelPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      asset_name: string
      base_id: string
      personnel_id: string | null
      quantity: number
      expenditure_date: Date
      reason: string
      authorized_by: string | null
      notes: string | null
      created_by: string
      created_at: Date | null
    }, ExtArgs["result"]["expenditures"]>
    composites: {}
  }

  type expendituresGetPayload<S extends boolean | null | undefined | expendituresDefaultArgs> = $Result.GetResult<Prisma.$expendituresPayload, S>

  type expendituresCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<expendituresFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExpendituresCountAggregateInputType | true
    }

  export interface expendituresDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['expenditures'], meta: { name: 'expenditures' } }
    /**
     * Find zero or one Expenditures that matches the filter.
     * @param {expendituresFindUniqueArgs} args - Arguments to find a Expenditures
     * @example
     * // Get one Expenditures
     * const expenditures = await prisma.expenditures.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends expendituresFindUniqueArgs>(args: SelectSubset<T, expendituresFindUniqueArgs<ExtArgs>>): Prisma__expendituresClient<$Result.GetResult<Prisma.$expendituresPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Expenditures that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {expendituresFindUniqueOrThrowArgs} args - Arguments to find a Expenditures
     * @example
     * // Get one Expenditures
     * const expenditures = await prisma.expenditures.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends expendituresFindUniqueOrThrowArgs>(args: SelectSubset<T, expendituresFindUniqueOrThrowArgs<ExtArgs>>): Prisma__expendituresClient<$Result.GetResult<Prisma.$expendituresPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Expenditures that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {expendituresFindFirstArgs} args - Arguments to find a Expenditures
     * @example
     * // Get one Expenditures
     * const expenditures = await prisma.expenditures.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends expendituresFindFirstArgs>(args?: SelectSubset<T, expendituresFindFirstArgs<ExtArgs>>): Prisma__expendituresClient<$Result.GetResult<Prisma.$expendituresPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Expenditures that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {expendituresFindFirstOrThrowArgs} args - Arguments to find a Expenditures
     * @example
     * // Get one Expenditures
     * const expenditures = await prisma.expenditures.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends expendituresFindFirstOrThrowArgs>(args?: SelectSubset<T, expendituresFindFirstOrThrowArgs<ExtArgs>>): Prisma__expendituresClient<$Result.GetResult<Prisma.$expendituresPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Expenditures that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {expendituresFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Expenditures
     * const expenditures = await prisma.expenditures.findMany()
     * 
     * // Get first 10 Expenditures
     * const expenditures = await prisma.expenditures.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const expendituresWithIdOnly = await prisma.expenditures.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends expendituresFindManyArgs>(args?: SelectSubset<T, expendituresFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$expendituresPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Expenditures.
     * @param {expendituresCreateArgs} args - Arguments to create a Expenditures.
     * @example
     * // Create one Expenditures
     * const Expenditures = await prisma.expenditures.create({
     *   data: {
     *     // ... data to create a Expenditures
     *   }
     * })
     * 
     */
    create<T extends expendituresCreateArgs>(args: SelectSubset<T, expendituresCreateArgs<ExtArgs>>): Prisma__expendituresClient<$Result.GetResult<Prisma.$expendituresPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Expenditures.
     * @param {expendituresCreateManyArgs} args - Arguments to create many Expenditures.
     * @example
     * // Create many Expenditures
     * const expenditures = await prisma.expenditures.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends expendituresCreateManyArgs>(args?: SelectSubset<T, expendituresCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Expenditures and returns the data saved in the database.
     * @param {expendituresCreateManyAndReturnArgs} args - Arguments to create many Expenditures.
     * @example
     * // Create many Expenditures
     * const expenditures = await prisma.expenditures.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Expenditures and only return the `id`
     * const expendituresWithIdOnly = await prisma.expenditures.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends expendituresCreateManyAndReturnArgs>(args?: SelectSubset<T, expendituresCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$expendituresPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Expenditures.
     * @param {expendituresDeleteArgs} args - Arguments to delete one Expenditures.
     * @example
     * // Delete one Expenditures
     * const Expenditures = await prisma.expenditures.delete({
     *   where: {
     *     // ... filter to delete one Expenditures
     *   }
     * })
     * 
     */
    delete<T extends expendituresDeleteArgs>(args: SelectSubset<T, expendituresDeleteArgs<ExtArgs>>): Prisma__expendituresClient<$Result.GetResult<Prisma.$expendituresPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Expenditures.
     * @param {expendituresUpdateArgs} args - Arguments to update one Expenditures.
     * @example
     * // Update one Expenditures
     * const expenditures = await prisma.expenditures.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends expendituresUpdateArgs>(args: SelectSubset<T, expendituresUpdateArgs<ExtArgs>>): Prisma__expendituresClient<$Result.GetResult<Prisma.$expendituresPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Expenditures.
     * @param {expendituresDeleteManyArgs} args - Arguments to filter Expenditures to delete.
     * @example
     * // Delete a few Expenditures
     * const { count } = await prisma.expenditures.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends expendituresDeleteManyArgs>(args?: SelectSubset<T, expendituresDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Expenditures.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {expendituresUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Expenditures
     * const expenditures = await prisma.expenditures.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends expendituresUpdateManyArgs>(args: SelectSubset<T, expendituresUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Expenditures and returns the data updated in the database.
     * @param {expendituresUpdateManyAndReturnArgs} args - Arguments to update many Expenditures.
     * @example
     * // Update many Expenditures
     * const expenditures = await prisma.expenditures.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Expenditures and only return the `id`
     * const expendituresWithIdOnly = await prisma.expenditures.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends expendituresUpdateManyAndReturnArgs>(args: SelectSubset<T, expendituresUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$expendituresPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Expenditures.
     * @param {expendituresUpsertArgs} args - Arguments to update or create a Expenditures.
     * @example
     * // Update or create a Expenditures
     * const expenditures = await prisma.expenditures.upsert({
     *   create: {
     *     // ... data to create a Expenditures
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Expenditures we want to update
     *   }
     * })
     */
    upsert<T extends expendituresUpsertArgs>(args: SelectSubset<T, expendituresUpsertArgs<ExtArgs>>): Prisma__expendituresClient<$Result.GetResult<Prisma.$expendituresPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Expenditures.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {expendituresCountArgs} args - Arguments to filter Expenditures to count.
     * @example
     * // Count the number of Expenditures
     * const count = await prisma.expenditures.count({
     *   where: {
     *     // ... the filter for the Expenditures we want to count
     *   }
     * })
    **/
    count<T extends expendituresCountArgs>(
      args?: Subset<T, expendituresCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExpendituresCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Expenditures.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpendituresAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExpendituresAggregateArgs>(args: Subset<T, ExpendituresAggregateArgs>): Prisma.PrismaPromise<GetExpendituresAggregateType<T>>

    /**
     * Group by Expenditures.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {expendituresGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends expendituresGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: expendituresGroupByArgs['orderBy'] }
        : { orderBy?: expendituresGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, expendituresGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExpendituresGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the expenditures model
   */
  readonly fields: expendituresFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for expenditures.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__expendituresClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users_expenditures_authorized_byTousers<T extends expenditures$users_expenditures_authorized_byTousersArgs<ExtArgs> = {}>(args?: Subset<T, expenditures$users_expenditures_authorized_byTousersArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    bases<T extends basesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, basesDefaultArgs<ExtArgs>>): Prisma__basesClient<$Result.GetResult<Prisma.$basesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    users_expenditures_created_byTousers<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    personnel<T extends expenditures$personnelArgs<ExtArgs> = {}>(args?: Subset<T, expenditures$personnelArgs<ExtArgs>>): Prisma__personnelClient<$Result.GetResult<Prisma.$personnelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the expenditures model
   */
  interface expendituresFieldRefs {
    readonly id: FieldRef<"expenditures", 'String'>
    readonly asset_name: FieldRef<"expenditures", 'String'>
    readonly base_id: FieldRef<"expenditures", 'String'>
    readonly personnel_id: FieldRef<"expenditures", 'String'>
    readonly quantity: FieldRef<"expenditures", 'Int'>
    readonly expenditure_date: FieldRef<"expenditures", 'DateTime'>
    readonly reason: FieldRef<"expenditures", 'String'>
    readonly authorized_by: FieldRef<"expenditures", 'String'>
    readonly notes: FieldRef<"expenditures", 'String'>
    readonly created_by: FieldRef<"expenditures", 'String'>
    readonly created_at: FieldRef<"expenditures", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * expenditures findUnique
   */
  export type expendituresFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the expenditures
     */
    select?: expendituresSelect<ExtArgs> | null
    /**
     * Omit specific fields from the expenditures
     */
    omit?: expendituresOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: expendituresInclude<ExtArgs> | null
    /**
     * Filter, which expenditures to fetch.
     */
    where: expendituresWhereUniqueInput
  }

  /**
   * expenditures findUniqueOrThrow
   */
  export type expendituresFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the expenditures
     */
    select?: expendituresSelect<ExtArgs> | null
    /**
     * Omit specific fields from the expenditures
     */
    omit?: expendituresOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: expendituresInclude<ExtArgs> | null
    /**
     * Filter, which expenditures to fetch.
     */
    where: expendituresWhereUniqueInput
  }

  /**
   * expenditures findFirst
   */
  export type expendituresFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the expenditures
     */
    select?: expendituresSelect<ExtArgs> | null
    /**
     * Omit specific fields from the expenditures
     */
    omit?: expendituresOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: expendituresInclude<ExtArgs> | null
    /**
     * Filter, which expenditures to fetch.
     */
    where?: expendituresWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of expenditures to fetch.
     */
    orderBy?: expendituresOrderByWithRelationInput | expendituresOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for expenditures.
     */
    cursor?: expendituresWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` expenditures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` expenditures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of expenditures.
     */
    distinct?: ExpendituresScalarFieldEnum | ExpendituresScalarFieldEnum[]
  }

  /**
   * expenditures findFirstOrThrow
   */
  export type expendituresFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the expenditures
     */
    select?: expendituresSelect<ExtArgs> | null
    /**
     * Omit specific fields from the expenditures
     */
    omit?: expendituresOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: expendituresInclude<ExtArgs> | null
    /**
     * Filter, which expenditures to fetch.
     */
    where?: expendituresWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of expenditures to fetch.
     */
    orderBy?: expendituresOrderByWithRelationInput | expendituresOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for expenditures.
     */
    cursor?: expendituresWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` expenditures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` expenditures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of expenditures.
     */
    distinct?: ExpendituresScalarFieldEnum | ExpendituresScalarFieldEnum[]
  }

  /**
   * expenditures findMany
   */
  export type expendituresFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the expenditures
     */
    select?: expendituresSelect<ExtArgs> | null
    /**
     * Omit specific fields from the expenditures
     */
    omit?: expendituresOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: expendituresInclude<ExtArgs> | null
    /**
     * Filter, which expenditures to fetch.
     */
    where?: expendituresWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of expenditures to fetch.
     */
    orderBy?: expendituresOrderByWithRelationInput | expendituresOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing expenditures.
     */
    cursor?: expendituresWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` expenditures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` expenditures.
     */
    skip?: number
    distinct?: ExpendituresScalarFieldEnum | ExpendituresScalarFieldEnum[]
  }

  /**
   * expenditures create
   */
  export type expendituresCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the expenditures
     */
    select?: expendituresSelect<ExtArgs> | null
    /**
     * Omit specific fields from the expenditures
     */
    omit?: expendituresOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: expendituresInclude<ExtArgs> | null
    /**
     * The data needed to create a expenditures.
     */
    data: XOR<expendituresCreateInput, expendituresUncheckedCreateInput>
  }

  /**
   * expenditures createMany
   */
  export type expendituresCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many expenditures.
     */
    data: expendituresCreateManyInput | expendituresCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * expenditures createManyAndReturn
   */
  export type expendituresCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the expenditures
     */
    select?: expendituresSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the expenditures
     */
    omit?: expendituresOmit<ExtArgs> | null
    /**
     * The data used to create many expenditures.
     */
    data: expendituresCreateManyInput | expendituresCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: expendituresIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * expenditures update
   */
  export type expendituresUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the expenditures
     */
    select?: expendituresSelect<ExtArgs> | null
    /**
     * Omit specific fields from the expenditures
     */
    omit?: expendituresOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: expendituresInclude<ExtArgs> | null
    /**
     * The data needed to update a expenditures.
     */
    data: XOR<expendituresUpdateInput, expendituresUncheckedUpdateInput>
    /**
     * Choose, which expenditures to update.
     */
    where: expendituresWhereUniqueInput
  }

  /**
   * expenditures updateMany
   */
  export type expendituresUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update expenditures.
     */
    data: XOR<expendituresUpdateManyMutationInput, expendituresUncheckedUpdateManyInput>
    /**
     * Filter which expenditures to update
     */
    where?: expendituresWhereInput
    /**
     * Limit how many expenditures to update.
     */
    limit?: number
  }

  /**
   * expenditures updateManyAndReturn
   */
  export type expendituresUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the expenditures
     */
    select?: expendituresSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the expenditures
     */
    omit?: expendituresOmit<ExtArgs> | null
    /**
     * The data used to update expenditures.
     */
    data: XOR<expendituresUpdateManyMutationInput, expendituresUncheckedUpdateManyInput>
    /**
     * Filter which expenditures to update
     */
    where?: expendituresWhereInput
    /**
     * Limit how many expenditures to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: expendituresIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * expenditures upsert
   */
  export type expendituresUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the expenditures
     */
    select?: expendituresSelect<ExtArgs> | null
    /**
     * Omit specific fields from the expenditures
     */
    omit?: expendituresOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: expendituresInclude<ExtArgs> | null
    /**
     * The filter to search for the expenditures to update in case it exists.
     */
    where: expendituresWhereUniqueInput
    /**
     * In case the expenditures found by the `where` argument doesn't exist, create a new expenditures with this data.
     */
    create: XOR<expendituresCreateInput, expendituresUncheckedCreateInput>
    /**
     * In case the expenditures was found with the provided `where` argument, update it with this data.
     */
    update: XOR<expendituresUpdateInput, expendituresUncheckedUpdateInput>
  }

  /**
   * expenditures delete
   */
  export type expendituresDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the expenditures
     */
    select?: expendituresSelect<ExtArgs> | null
    /**
     * Omit specific fields from the expenditures
     */
    omit?: expendituresOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: expendituresInclude<ExtArgs> | null
    /**
     * Filter which expenditures to delete.
     */
    where: expendituresWhereUniqueInput
  }

  /**
   * expenditures deleteMany
   */
  export type expendituresDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which expenditures to delete
     */
    where?: expendituresWhereInput
    /**
     * Limit how many expenditures to delete.
     */
    limit?: number
  }

  /**
   * expenditures.users_expenditures_authorized_byTousers
   */
  export type expenditures$users_expenditures_authorized_byTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    where?: usersWhereInput
  }

  /**
   * expenditures.personnel
   */
  export type expenditures$personnelArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the personnel
     */
    select?: personnelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the personnel
     */
    omit?: personnelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: personnelInclude<ExtArgs> | null
    where?: personnelWhereInput
  }

  /**
   * expenditures without action
   */
  export type expendituresDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the expenditures
     */
    select?: expendituresSelect<ExtArgs> | null
    /**
     * Omit specific fields from the expenditures
     */
    omit?: expendituresOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: expendituresInclude<ExtArgs> | null
  }


  /**
   * Model personnel
   */

  export type AggregatePersonnel = {
    _count: PersonnelCountAggregateOutputType | null
    _min: PersonnelMinAggregateOutputType | null
    _max: PersonnelMaxAggregateOutputType | null
  }

  export type PersonnelMinAggregateOutputType = {
    id: string | null
    first_name: string | null
    last_name: string | null
    rank: string | null
    base_id: string | null
    email: string | null
    phone: string | null
    department: string | null
    is_active: boolean | null
    created_at: Date | null
  }

  export type PersonnelMaxAggregateOutputType = {
    id: string | null
    first_name: string | null
    last_name: string | null
    rank: string | null
    base_id: string | null
    email: string | null
    phone: string | null
    department: string | null
    is_active: boolean | null
    created_at: Date | null
  }

  export type PersonnelCountAggregateOutputType = {
    id: number
    first_name: number
    last_name: number
    rank: number
    base_id: number
    email: number
    phone: number
    department: number
    is_active: number
    created_at: number
    _all: number
  }


  export type PersonnelMinAggregateInputType = {
    id?: true
    first_name?: true
    last_name?: true
    rank?: true
    base_id?: true
    email?: true
    phone?: true
    department?: true
    is_active?: true
    created_at?: true
  }

  export type PersonnelMaxAggregateInputType = {
    id?: true
    first_name?: true
    last_name?: true
    rank?: true
    base_id?: true
    email?: true
    phone?: true
    department?: true
    is_active?: true
    created_at?: true
  }

  export type PersonnelCountAggregateInputType = {
    id?: true
    first_name?: true
    last_name?: true
    rank?: true
    base_id?: true
    email?: true
    phone?: true
    department?: true
    is_active?: true
    created_at?: true
    _all?: true
  }

  export type PersonnelAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which personnel to aggregate.
     */
    where?: personnelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of personnel to fetch.
     */
    orderBy?: personnelOrderByWithRelationInput | personnelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: personnelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` personnel from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` personnel.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned personnel
    **/
    _count?: true | PersonnelCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PersonnelMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PersonnelMaxAggregateInputType
  }

  export type GetPersonnelAggregateType<T extends PersonnelAggregateArgs> = {
        [P in keyof T & keyof AggregatePersonnel]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePersonnel[P]>
      : GetScalarType<T[P], AggregatePersonnel[P]>
  }




  export type personnelGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: personnelWhereInput
    orderBy?: personnelOrderByWithAggregationInput | personnelOrderByWithAggregationInput[]
    by: PersonnelScalarFieldEnum[] | PersonnelScalarFieldEnum
    having?: personnelScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PersonnelCountAggregateInputType | true
    _min?: PersonnelMinAggregateInputType
    _max?: PersonnelMaxAggregateInputType
  }

  export type PersonnelGroupByOutputType = {
    id: string
    first_name: string
    last_name: string
    rank: string
    base_id: string
    email: string | null
    phone: string | null
    department: string | null
    is_active: boolean | null
    created_at: Date | null
    _count: PersonnelCountAggregateOutputType | null
    _min: PersonnelMinAggregateOutputType | null
    _max: PersonnelMaxAggregateOutputType | null
  }

  type GetPersonnelGroupByPayload<T extends personnelGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PersonnelGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PersonnelGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PersonnelGroupByOutputType[P]>
            : GetScalarType<T[P], PersonnelGroupByOutputType[P]>
        }
      >
    >


  export type personnelSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    first_name?: boolean
    last_name?: boolean
    rank?: boolean
    base_id?: boolean
    email?: boolean
    phone?: boolean
    department?: boolean
    is_active?: boolean
    created_at?: boolean
    assignments?: boolean | personnel$assignmentsArgs<ExtArgs>
    expenditures?: boolean | personnel$expendituresArgs<ExtArgs>
    bases?: boolean | basesDefaultArgs<ExtArgs>
    _count?: boolean | PersonnelCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["personnel"]>

  export type personnelSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    first_name?: boolean
    last_name?: boolean
    rank?: boolean
    base_id?: boolean
    email?: boolean
    phone?: boolean
    department?: boolean
    is_active?: boolean
    created_at?: boolean
    bases?: boolean | basesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["personnel"]>

  export type personnelSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    first_name?: boolean
    last_name?: boolean
    rank?: boolean
    base_id?: boolean
    email?: boolean
    phone?: boolean
    department?: boolean
    is_active?: boolean
    created_at?: boolean
    bases?: boolean | basesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["personnel"]>

  export type personnelSelectScalar = {
    id?: boolean
    first_name?: boolean
    last_name?: boolean
    rank?: boolean
    base_id?: boolean
    email?: boolean
    phone?: boolean
    department?: boolean
    is_active?: boolean
    created_at?: boolean
  }

  export type personnelOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "first_name" | "last_name" | "rank" | "base_id" | "email" | "phone" | "department" | "is_active" | "created_at", ExtArgs["result"]["personnel"]>
  export type personnelInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignments?: boolean | personnel$assignmentsArgs<ExtArgs>
    expenditures?: boolean | personnel$expendituresArgs<ExtArgs>
    bases?: boolean | basesDefaultArgs<ExtArgs>
    _count?: boolean | PersonnelCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type personnelIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bases?: boolean | basesDefaultArgs<ExtArgs>
  }
  export type personnelIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bases?: boolean | basesDefaultArgs<ExtArgs>
  }

  export type $personnelPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "personnel"
    objects: {
      assignments: Prisma.$assignmentsPayload<ExtArgs>[]
      expenditures: Prisma.$expendituresPayload<ExtArgs>[]
      bases: Prisma.$basesPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      first_name: string
      last_name: string
      rank: string
      base_id: string
      email: string | null
      phone: string | null
      department: string | null
      is_active: boolean | null
      created_at: Date | null
    }, ExtArgs["result"]["personnel"]>
    composites: {}
  }

  type personnelGetPayload<S extends boolean | null | undefined | personnelDefaultArgs> = $Result.GetResult<Prisma.$personnelPayload, S>

  type personnelCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<personnelFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PersonnelCountAggregateInputType | true
    }

  export interface personnelDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['personnel'], meta: { name: 'personnel' } }
    /**
     * Find zero or one Personnel that matches the filter.
     * @param {personnelFindUniqueArgs} args - Arguments to find a Personnel
     * @example
     * // Get one Personnel
     * const personnel = await prisma.personnel.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends personnelFindUniqueArgs>(args: SelectSubset<T, personnelFindUniqueArgs<ExtArgs>>): Prisma__personnelClient<$Result.GetResult<Prisma.$personnelPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Personnel that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {personnelFindUniqueOrThrowArgs} args - Arguments to find a Personnel
     * @example
     * // Get one Personnel
     * const personnel = await prisma.personnel.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends personnelFindUniqueOrThrowArgs>(args: SelectSubset<T, personnelFindUniqueOrThrowArgs<ExtArgs>>): Prisma__personnelClient<$Result.GetResult<Prisma.$personnelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Personnel that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {personnelFindFirstArgs} args - Arguments to find a Personnel
     * @example
     * // Get one Personnel
     * const personnel = await prisma.personnel.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends personnelFindFirstArgs>(args?: SelectSubset<T, personnelFindFirstArgs<ExtArgs>>): Prisma__personnelClient<$Result.GetResult<Prisma.$personnelPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Personnel that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {personnelFindFirstOrThrowArgs} args - Arguments to find a Personnel
     * @example
     * // Get one Personnel
     * const personnel = await prisma.personnel.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends personnelFindFirstOrThrowArgs>(args?: SelectSubset<T, personnelFindFirstOrThrowArgs<ExtArgs>>): Prisma__personnelClient<$Result.GetResult<Prisma.$personnelPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Personnel that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {personnelFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Personnel
     * const personnel = await prisma.personnel.findMany()
     * 
     * // Get first 10 Personnel
     * const personnel = await prisma.personnel.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const personnelWithIdOnly = await prisma.personnel.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends personnelFindManyArgs>(args?: SelectSubset<T, personnelFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$personnelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Personnel.
     * @param {personnelCreateArgs} args - Arguments to create a Personnel.
     * @example
     * // Create one Personnel
     * const Personnel = await prisma.personnel.create({
     *   data: {
     *     // ... data to create a Personnel
     *   }
     * })
     * 
     */
    create<T extends personnelCreateArgs>(args: SelectSubset<T, personnelCreateArgs<ExtArgs>>): Prisma__personnelClient<$Result.GetResult<Prisma.$personnelPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Personnel.
     * @param {personnelCreateManyArgs} args - Arguments to create many Personnel.
     * @example
     * // Create many Personnel
     * const personnel = await prisma.personnel.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends personnelCreateManyArgs>(args?: SelectSubset<T, personnelCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Personnel and returns the data saved in the database.
     * @param {personnelCreateManyAndReturnArgs} args - Arguments to create many Personnel.
     * @example
     * // Create many Personnel
     * const personnel = await prisma.personnel.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Personnel and only return the `id`
     * const personnelWithIdOnly = await prisma.personnel.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends personnelCreateManyAndReturnArgs>(args?: SelectSubset<T, personnelCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$personnelPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Personnel.
     * @param {personnelDeleteArgs} args - Arguments to delete one Personnel.
     * @example
     * // Delete one Personnel
     * const Personnel = await prisma.personnel.delete({
     *   where: {
     *     // ... filter to delete one Personnel
     *   }
     * })
     * 
     */
    delete<T extends personnelDeleteArgs>(args: SelectSubset<T, personnelDeleteArgs<ExtArgs>>): Prisma__personnelClient<$Result.GetResult<Prisma.$personnelPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Personnel.
     * @param {personnelUpdateArgs} args - Arguments to update one Personnel.
     * @example
     * // Update one Personnel
     * const personnel = await prisma.personnel.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends personnelUpdateArgs>(args: SelectSubset<T, personnelUpdateArgs<ExtArgs>>): Prisma__personnelClient<$Result.GetResult<Prisma.$personnelPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Personnel.
     * @param {personnelDeleteManyArgs} args - Arguments to filter Personnel to delete.
     * @example
     * // Delete a few Personnel
     * const { count } = await prisma.personnel.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends personnelDeleteManyArgs>(args?: SelectSubset<T, personnelDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Personnel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {personnelUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Personnel
     * const personnel = await prisma.personnel.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends personnelUpdateManyArgs>(args: SelectSubset<T, personnelUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Personnel and returns the data updated in the database.
     * @param {personnelUpdateManyAndReturnArgs} args - Arguments to update many Personnel.
     * @example
     * // Update many Personnel
     * const personnel = await prisma.personnel.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Personnel and only return the `id`
     * const personnelWithIdOnly = await prisma.personnel.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends personnelUpdateManyAndReturnArgs>(args: SelectSubset<T, personnelUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$personnelPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Personnel.
     * @param {personnelUpsertArgs} args - Arguments to update or create a Personnel.
     * @example
     * // Update or create a Personnel
     * const personnel = await prisma.personnel.upsert({
     *   create: {
     *     // ... data to create a Personnel
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Personnel we want to update
     *   }
     * })
     */
    upsert<T extends personnelUpsertArgs>(args: SelectSubset<T, personnelUpsertArgs<ExtArgs>>): Prisma__personnelClient<$Result.GetResult<Prisma.$personnelPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Personnel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {personnelCountArgs} args - Arguments to filter Personnel to count.
     * @example
     * // Count the number of Personnel
     * const count = await prisma.personnel.count({
     *   where: {
     *     // ... the filter for the Personnel we want to count
     *   }
     * })
    **/
    count<T extends personnelCountArgs>(
      args?: Subset<T, personnelCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PersonnelCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Personnel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonnelAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PersonnelAggregateArgs>(args: Subset<T, PersonnelAggregateArgs>): Prisma.PrismaPromise<GetPersonnelAggregateType<T>>

    /**
     * Group by Personnel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {personnelGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends personnelGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: personnelGroupByArgs['orderBy'] }
        : { orderBy?: personnelGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, personnelGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPersonnelGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the personnel model
   */
  readonly fields: personnelFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for personnel.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__personnelClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    assignments<T extends personnel$assignmentsArgs<ExtArgs> = {}>(args?: Subset<T, personnel$assignmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$assignmentsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    expenditures<T extends personnel$expendituresArgs<ExtArgs> = {}>(args?: Subset<T, personnel$expendituresArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$expendituresPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    bases<T extends basesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, basesDefaultArgs<ExtArgs>>): Prisma__basesClient<$Result.GetResult<Prisma.$basesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the personnel model
   */
  interface personnelFieldRefs {
    readonly id: FieldRef<"personnel", 'String'>
    readonly first_name: FieldRef<"personnel", 'String'>
    readonly last_name: FieldRef<"personnel", 'String'>
    readonly rank: FieldRef<"personnel", 'String'>
    readonly base_id: FieldRef<"personnel", 'String'>
    readonly email: FieldRef<"personnel", 'String'>
    readonly phone: FieldRef<"personnel", 'String'>
    readonly department: FieldRef<"personnel", 'String'>
    readonly is_active: FieldRef<"personnel", 'Boolean'>
    readonly created_at: FieldRef<"personnel", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * personnel findUnique
   */
  export type personnelFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the personnel
     */
    select?: personnelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the personnel
     */
    omit?: personnelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: personnelInclude<ExtArgs> | null
    /**
     * Filter, which personnel to fetch.
     */
    where: personnelWhereUniqueInput
  }

  /**
   * personnel findUniqueOrThrow
   */
  export type personnelFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the personnel
     */
    select?: personnelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the personnel
     */
    omit?: personnelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: personnelInclude<ExtArgs> | null
    /**
     * Filter, which personnel to fetch.
     */
    where: personnelWhereUniqueInput
  }

  /**
   * personnel findFirst
   */
  export type personnelFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the personnel
     */
    select?: personnelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the personnel
     */
    omit?: personnelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: personnelInclude<ExtArgs> | null
    /**
     * Filter, which personnel to fetch.
     */
    where?: personnelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of personnel to fetch.
     */
    orderBy?: personnelOrderByWithRelationInput | personnelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for personnel.
     */
    cursor?: personnelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` personnel from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` personnel.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of personnel.
     */
    distinct?: PersonnelScalarFieldEnum | PersonnelScalarFieldEnum[]
  }

  /**
   * personnel findFirstOrThrow
   */
  export type personnelFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the personnel
     */
    select?: personnelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the personnel
     */
    omit?: personnelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: personnelInclude<ExtArgs> | null
    /**
     * Filter, which personnel to fetch.
     */
    where?: personnelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of personnel to fetch.
     */
    orderBy?: personnelOrderByWithRelationInput | personnelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for personnel.
     */
    cursor?: personnelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` personnel from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` personnel.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of personnel.
     */
    distinct?: PersonnelScalarFieldEnum | PersonnelScalarFieldEnum[]
  }

  /**
   * personnel findMany
   */
  export type personnelFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the personnel
     */
    select?: personnelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the personnel
     */
    omit?: personnelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: personnelInclude<ExtArgs> | null
    /**
     * Filter, which personnel to fetch.
     */
    where?: personnelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of personnel to fetch.
     */
    orderBy?: personnelOrderByWithRelationInput | personnelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing personnel.
     */
    cursor?: personnelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` personnel from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` personnel.
     */
    skip?: number
    distinct?: PersonnelScalarFieldEnum | PersonnelScalarFieldEnum[]
  }

  /**
   * personnel create
   */
  export type personnelCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the personnel
     */
    select?: personnelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the personnel
     */
    omit?: personnelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: personnelInclude<ExtArgs> | null
    /**
     * The data needed to create a personnel.
     */
    data: XOR<personnelCreateInput, personnelUncheckedCreateInput>
  }

  /**
   * personnel createMany
   */
  export type personnelCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many personnel.
     */
    data: personnelCreateManyInput | personnelCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * personnel createManyAndReturn
   */
  export type personnelCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the personnel
     */
    select?: personnelSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the personnel
     */
    omit?: personnelOmit<ExtArgs> | null
    /**
     * The data used to create many personnel.
     */
    data: personnelCreateManyInput | personnelCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: personnelIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * personnel update
   */
  export type personnelUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the personnel
     */
    select?: personnelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the personnel
     */
    omit?: personnelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: personnelInclude<ExtArgs> | null
    /**
     * The data needed to update a personnel.
     */
    data: XOR<personnelUpdateInput, personnelUncheckedUpdateInput>
    /**
     * Choose, which personnel to update.
     */
    where: personnelWhereUniqueInput
  }

  /**
   * personnel updateMany
   */
  export type personnelUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update personnel.
     */
    data: XOR<personnelUpdateManyMutationInput, personnelUncheckedUpdateManyInput>
    /**
     * Filter which personnel to update
     */
    where?: personnelWhereInput
    /**
     * Limit how many personnel to update.
     */
    limit?: number
  }

  /**
   * personnel updateManyAndReturn
   */
  export type personnelUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the personnel
     */
    select?: personnelSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the personnel
     */
    omit?: personnelOmit<ExtArgs> | null
    /**
     * The data used to update personnel.
     */
    data: XOR<personnelUpdateManyMutationInput, personnelUncheckedUpdateManyInput>
    /**
     * Filter which personnel to update
     */
    where?: personnelWhereInput
    /**
     * Limit how many personnel to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: personnelIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * personnel upsert
   */
  export type personnelUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the personnel
     */
    select?: personnelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the personnel
     */
    omit?: personnelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: personnelInclude<ExtArgs> | null
    /**
     * The filter to search for the personnel to update in case it exists.
     */
    where: personnelWhereUniqueInput
    /**
     * In case the personnel found by the `where` argument doesn't exist, create a new personnel with this data.
     */
    create: XOR<personnelCreateInput, personnelUncheckedCreateInput>
    /**
     * In case the personnel was found with the provided `where` argument, update it with this data.
     */
    update: XOR<personnelUpdateInput, personnelUncheckedUpdateInput>
  }

  /**
   * personnel delete
   */
  export type personnelDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the personnel
     */
    select?: personnelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the personnel
     */
    omit?: personnelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: personnelInclude<ExtArgs> | null
    /**
     * Filter which personnel to delete.
     */
    where: personnelWhereUniqueInput
  }

  /**
   * personnel deleteMany
   */
  export type personnelDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which personnel to delete
     */
    where?: personnelWhereInput
    /**
     * Limit how many personnel to delete.
     */
    limit?: number
  }

  /**
   * personnel.assignments
   */
  export type personnel$assignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the assignments
     */
    select?: assignmentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the assignments
     */
    omit?: assignmentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: assignmentsInclude<ExtArgs> | null
    where?: assignmentsWhereInput
    orderBy?: assignmentsOrderByWithRelationInput | assignmentsOrderByWithRelationInput[]
    cursor?: assignmentsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AssignmentsScalarFieldEnum | AssignmentsScalarFieldEnum[]
  }

  /**
   * personnel.expenditures
   */
  export type personnel$expendituresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the expenditures
     */
    select?: expendituresSelect<ExtArgs> | null
    /**
     * Omit specific fields from the expenditures
     */
    omit?: expendituresOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: expendituresInclude<ExtArgs> | null
    where?: expendituresWhereInput
    orderBy?: expendituresOrderByWithRelationInput | expendituresOrderByWithRelationInput[]
    cursor?: expendituresWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExpendituresScalarFieldEnum | ExpendituresScalarFieldEnum[]
  }

  /**
   * personnel without action
   */
  export type personnelDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the personnel
     */
    select?: personnelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the personnel
     */
    omit?: personnelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: personnelInclude<ExtArgs> | null
  }


  /**
   * Model purchases
   */

  export type AggregatePurchases = {
    _count: PurchasesCountAggregateOutputType | null
    _avg: PurchasesAvgAggregateOutputType | null
    _sum: PurchasesSumAggregateOutputType | null
    _min: PurchasesMinAggregateOutputType | null
    _max: PurchasesMaxAggregateOutputType | null
  }

  export type PurchasesAvgAggregateOutputType = {
    quantity: number | null
  }

  export type PurchasesSumAggregateOutputType = {
    quantity: number | null
  }

  export type PurchasesMinAggregateOutputType = {
    id: string | null
    asset_id: string | null
    base_id: string | null
    quantity: number | null
    supplier: string | null
    purchase_date: Date | null
    status: string | null
    approved_by: string | null
    approved_at: Date | null
    notes: string | null
    created_by: string | null
    created_at: Date | null
  }

  export type PurchasesMaxAggregateOutputType = {
    id: string | null
    asset_id: string | null
    base_id: string | null
    quantity: number | null
    supplier: string | null
    purchase_date: Date | null
    status: string | null
    approved_by: string | null
    approved_at: Date | null
    notes: string | null
    created_by: string | null
    created_at: Date | null
  }

  export type PurchasesCountAggregateOutputType = {
    id: number
    asset_id: number
    base_id: number
    quantity: number
    supplier: number
    purchase_date: number
    status: number
    approved_by: number
    approved_at: number
    notes: number
    created_by: number
    created_at: number
    _all: number
  }


  export type PurchasesAvgAggregateInputType = {
    quantity?: true
  }

  export type PurchasesSumAggregateInputType = {
    quantity?: true
  }

  export type PurchasesMinAggregateInputType = {
    id?: true
    asset_id?: true
    base_id?: true
    quantity?: true
    supplier?: true
    purchase_date?: true
    status?: true
    approved_by?: true
    approved_at?: true
    notes?: true
    created_by?: true
    created_at?: true
  }

  export type PurchasesMaxAggregateInputType = {
    id?: true
    asset_id?: true
    base_id?: true
    quantity?: true
    supplier?: true
    purchase_date?: true
    status?: true
    approved_by?: true
    approved_at?: true
    notes?: true
    created_by?: true
    created_at?: true
  }

  export type PurchasesCountAggregateInputType = {
    id?: true
    asset_id?: true
    base_id?: true
    quantity?: true
    supplier?: true
    purchase_date?: true
    status?: true
    approved_by?: true
    approved_at?: true
    notes?: true
    created_by?: true
    created_at?: true
    _all?: true
  }

  export type PurchasesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which purchases to aggregate.
     */
    where?: purchasesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of purchases to fetch.
     */
    orderBy?: purchasesOrderByWithRelationInput | purchasesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: purchasesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` purchases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` purchases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned purchases
    **/
    _count?: true | PurchasesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PurchasesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PurchasesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PurchasesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PurchasesMaxAggregateInputType
  }

  export type GetPurchasesAggregateType<T extends PurchasesAggregateArgs> = {
        [P in keyof T & keyof AggregatePurchases]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePurchases[P]>
      : GetScalarType<T[P], AggregatePurchases[P]>
  }




  export type purchasesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: purchasesWhereInput
    orderBy?: purchasesOrderByWithAggregationInput | purchasesOrderByWithAggregationInput[]
    by: PurchasesScalarFieldEnum[] | PurchasesScalarFieldEnum
    having?: purchasesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PurchasesCountAggregateInputType | true
    _avg?: PurchasesAvgAggregateInputType
    _sum?: PurchasesSumAggregateInputType
    _min?: PurchasesMinAggregateInputType
    _max?: PurchasesMaxAggregateInputType
  }

  export type PurchasesGroupByOutputType = {
    id: string
    asset_id: string
    base_id: string
    quantity: number
    supplier: string | null
    purchase_date: Date
    status: string
    approved_by: string | null
    approved_at: Date | null
    notes: string | null
    created_by: string
    created_at: Date | null
    _count: PurchasesCountAggregateOutputType | null
    _avg: PurchasesAvgAggregateOutputType | null
    _sum: PurchasesSumAggregateOutputType | null
    _min: PurchasesMinAggregateOutputType | null
    _max: PurchasesMaxAggregateOutputType | null
  }

  type GetPurchasesGroupByPayload<T extends purchasesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PurchasesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PurchasesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PurchasesGroupByOutputType[P]>
            : GetScalarType<T[P], PurchasesGroupByOutputType[P]>
        }
      >
    >


  export type purchasesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    asset_id?: boolean
    base_id?: boolean
    quantity?: boolean
    supplier?: boolean
    purchase_date?: boolean
    status?: boolean
    approved_by?: boolean
    approved_at?: boolean
    notes?: boolean
    created_by?: boolean
    created_at?: boolean
    users_purchases_approved_byTousers?: boolean | purchases$users_purchases_approved_byTousersArgs<ExtArgs>
    assets?: boolean | assetsDefaultArgs<ExtArgs>
    bases?: boolean | basesDefaultArgs<ExtArgs>
    users_purchases_created_byTousers?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["purchases"]>

  export type purchasesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    asset_id?: boolean
    base_id?: boolean
    quantity?: boolean
    supplier?: boolean
    purchase_date?: boolean
    status?: boolean
    approved_by?: boolean
    approved_at?: boolean
    notes?: boolean
    created_by?: boolean
    created_at?: boolean
    users_purchases_approved_byTousers?: boolean | purchases$users_purchases_approved_byTousersArgs<ExtArgs>
    assets?: boolean | assetsDefaultArgs<ExtArgs>
    bases?: boolean | basesDefaultArgs<ExtArgs>
    users_purchases_created_byTousers?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["purchases"]>

  export type purchasesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    asset_id?: boolean
    base_id?: boolean
    quantity?: boolean
    supplier?: boolean
    purchase_date?: boolean
    status?: boolean
    approved_by?: boolean
    approved_at?: boolean
    notes?: boolean
    created_by?: boolean
    created_at?: boolean
    users_purchases_approved_byTousers?: boolean | purchases$users_purchases_approved_byTousersArgs<ExtArgs>
    assets?: boolean | assetsDefaultArgs<ExtArgs>
    bases?: boolean | basesDefaultArgs<ExtArgs>
    users_purchases_created_byTousers?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["purchases"]>

  export type purchasesSelectScalar = {
    id?: boolean
    asset_id?: boolean
    base_id?: boolean
    quantity?: boolean
    supplier?: boolean
    purchase_date?: boolean
    status?: boolean
    approved_by?: boolean
    approved_at?: boolean
    notes?: boolean
    created_by?: boolean
    created_at?: boolean
  }

  export type purchasesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "asset_id" | "base_id" | "quantity" | "supplier" | "purchase_date" | "status" | "approved_by" | "approved_at" | "notes" | "created_by" | "created_at", ExtArgs["result"]["purchases"]>
  export type purchasesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users_purchases_approved_byTousers?: boolean | purchases$users_purchases_approved_byTousersArgs<ExtArgs>
    assets?: boolean | assetsDefaultArgs<ExtArgs>
    bases?: boolean | basesDefaultArgs<ExtArgs>
    users_purchases_created_byTousers?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type purchasesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users_purchases_approved_byTousers?: boolean | purchases$users_purchases_approved_byTousersArgs<ExtArgs>
    assets?: boolean | assetsDefaultArgs<ExtArgs>
    bases?: boolean | basesDefaultArgs<ExtArgs>
    users_purchases_created_byTousers?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type purchasesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users_purchases_approved_byTousers?: boolean | purchases$users_purchases_approved_byTousersArgs<ExtArgs>
    assets?: boolean | assetsDefaultArgs<ExtArgs>
    bases?: boolean | basesDefaultArgs<ExtArgs>
    users_purchases_created_byTousers?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $purchasesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "purchases"
    objects: {
      users_purchases_approved_byTousers: Prisma.$usersPayload<ExtArgs> | null
      assets: Prisma.$assetsPayload<ExtArgs>
      bases: Prisma.$basesPayload<ExtArgs>
      users_purchases_created_byTousers: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      asset_id: string
      base_id: string
      quantity: number
      supplier: string | null
      purchase_date: Date
      status: string
      approved_by: string | null
      approved_at: Date | null
      notes: string | null
      created_by: string
      created_at: Date | null
    }, ExtArgs["result"]["purchases"]>
    composites: {}
  }

  type purchasesGetPayload<S extends boolean | null | undefined | purchasesDefaultArgs> = $Result.GetResult<Prisma.$purchasesPayload, S>

  type purchasesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<purchasesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PurchasesCountAggregateInputType | true
    }

  export interface purchasesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['purchases'], meta: { name: 'purchases' } }
    /**
     * Find zero or one Purchases that matches the filter.
     * @param {purchasesFindUniqueArgs} args - Arguments to find a Purchases
     * @example
     * // Get one Purchases
     * const purchases = await prisma.purchases.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends purchasesFindUniqueArgs>(args: SelectSubset<T, purchasesFindUniqueArgs<ExtArgs>>): Prisma__purchasesClient<$Result.GetResult<Prisma.$purchasesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Purchases that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {purchasesFindUniqueOrThrowArgs} args - Arguments to find a Purchases
     * @example
     * // Get one Purchases
     * const purchases = await prisma.purchases.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends purchasesFindUniqueOrThrowArgs>(args: SelectSubset<T, purchasesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__purchasesClient<$Result.GetResult<Prisma.$purchasesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Purchases that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {purchasesFindFirstArgs} args - Arguments to find a Purchases
     * @example
     * // Get one Purchases
     * const purchases = await prisma.purchases.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends purchasesFindFirstArgs>(args?: SelectSubset<T, purchasesFindFirstArgs<ExtArgs>>): Prisma__purchasesClient<$Result.GetResult<Prisma.$purchasesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Purchases that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {purchasesFindFirstOrThrowArgs} args - Arguments to find a Purchases
     * @example
     * // Get one Purchases
     * const purchases = await prisma.purchases.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends purchasesFindFirstOrThrowArgs>(args?: SelectSubset<T, purchasesFindFirstOrThrowArgs<ExtArgs>>): Prisma__purchasesClient<$Result.GetResult<Prisma.$purchasesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Purchases that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {purchasesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Purchases
     * const purchases = await prisma.purchases.findMany()
     * 
     * // Get first 10 Purchases
     * const purchases = await prisma.purchases.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const purchasesWithIdOnly = await prisma.purchases.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends purchasesFindManyArgs>(args?: SelectSubset<T, purchasesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$purchasesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Purchases.
     * @param {purchasesCreateArgs} args - Arguments to create a Purchases.
     * @example
     * // Create one Purchases
     * const Purchases = await prisma.purchases.create({
     *   data: {
     *     // ... data to create a Purchases
     *   }
     * })
     * 
     */
    create<T extends purchasesCreateArgs>(args: SelectSubset<T, purchasesCreateArgs<ExtArgs>>): Prisma__purchasesClient<$Result.GetResult<Prisma.$purchasesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Purchases.
     * @param {purchasesCreateManyArgs} args - Arguments to create many Purchases.
     * @example
     * // Create many Purchases
     * const purchases = await prisma.purchases.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends purchasesCreateManyArgs>(args?: SelectSubset<T, purchasesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Purchases and returns the data saved in the database.
     * @param {purchasesCreateManyAndReturnArgs} args - Arguments to create many Purchases.
     * @example
     * // Create many Purchases
     * const purchases = await prisma.purchases.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Purchases and only return the `id`
     * const purchasesWithIdOnly = await prisma.purchases.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends purchasesCreateManyAndReturnArgs>(args?: SelectSubset<T, purchasesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$purchasesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Purchases.
     * @param {purchasesDeleteArgs} args - Arguments to delete one Purchases.
     * @example
     * // Delete one Purchases
     * const Purchases = await prisma.purchases.delete({
     *   where: {
     *     // ... filter to delete one Purchases
     *   }
     * })
     * 
     */
    delete<T extends purchasesDeleteArgs>(args: SelectSubset<T, purchasesDeleteArgs<ExtArgs>>): Prisma__purchasesClient<$Result.GetResult<Prisma.$purchasesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Purchases.
     * @param {purchasesUpdateArgs} args - Arguments to update one Purchases.
     * @example
     * // Update one Purchases
     * const purchases = await prisma.purchases.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends purchasesUpdateArgs>(args: SelectSubset<T, purchasesUpdateArgs<ExtArgs>>): Prisma__purchasesClient<$Result.GetResult<Prisma.$purchasesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Purchases.
     * @param {purchasesDeleteManyArgs} args - Arguments to filter Purchases to delete.
     * @example
     * // Delete a few Purchases
     * const { count } = await prisma.purchases.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends purchasesDeleteManyArgs>(args?: SelectSubset<T, purchasesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Purchases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {purchasesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Purchases
     * const purchases = await prisma.purchases.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends purchasesUpdateManyArgs>(args: SelectSubset<T, purchasesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Purchases and returns the data updated in the database.
     * @param {purchasesUpdateManyAndReturnArgs} args - Arguments to update many Purchases.
     * @example
     * // Update many Purchases
     * const purchases = await prisma.purchases.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Purchases and only return the `id`
     * const purchasesWithIdOnly = await prisma.purchases.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends purchasesUpdateManyAndReturnArgs>(args: SelectSubset<T, purchasesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$purchasesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Purchases.
     * @param {purchasesUpsertArgs} args - Arguments to update or create a Purchases.
     * @example
     * // Update or create a Purchases
     * const purchases = await prisma.purchases.upsert({
     *   create: {
     *     // ... data to create a Purchases
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Purchases we want to update
     *   }
     * })
     */
    upsert<T extends purchasesUpsertArgs>(args: SelectSubset<T, purchasesUpsertArgs<ExtArgs>>): Prisma__purchasesClient<$Result.GetResult<Prisma.$purchasesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Purchases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {purchasesCountArgs} args - Arguments to filter Purchases to count.
     * @example
     * // Count the number of Purchases
     * const count = await prisma.purchases.count({
     *   where: {
     *     // ... the filter for the Purchases we want to count
     *   }
     * })
    **/
    count<T extends purchasesCountArgs>(
      args?: Subset<T, purchasesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PurchasesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Purchases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchasesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PurchasesAggregateArgs>(args: Subset<T, PurchasesAggregateArgs>): Prisma.PrismaPromise<GetPurchasesAggregateType<T>>

    /**
     * Group by Purchases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {purchasesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends purchasesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: purchasesGroupByArgs['orderBy'] }
        : { orderBy?: purchasesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, purchasesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPurchasesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the purchases model
   */
  readonly fields: purchasesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for purchases.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__purchasesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users_purchases_approved_byTousers<T extends purchases$users_purchases_approved_byTousersArgs<ExtArgs> = {}>(args?: Subset<T, purchases$users_purchases_approved_byTousersArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    assets<T extends assetsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, assetsDefaultArgs<ExtArgs>>): Prisma__assetsClient<$Result.GetResult<Prisma.$assetsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    bases<T extends basesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, basesDefaultArgs<ExtArgs>>): Prisma__basesClient<$Result.GetResult<Prisma.$basesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    users_purchases_created_byTousers<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the purchases model
   */
  interface purchasesFieldRefs {
    readonly id: FieldRef<"purchases", 'String'>
    readonly asset_id: FieldRef<"purchases", 'String'>
    readonly base_id: FieldRef<"purchases", 'String'>
    readonly quantity: FieldRef<"purchases", 'Int'>
    readonly supplier: FieldRef<"purchases", 'String'>
    readonly purchase_date: FieldRef<"purchases", 'DateTime'>
    readonly status: FieldRef<"purchases", 'String'>
    readonly approved_by: FieldRef<"purchases", 'String'>
    readonly approved_at: FieldRef<"purchases", 'DateTime'>
    readonly notes: FieldRef<"purchases", 'String'>
    readonly created_by: FieldRef<"purchases", 'String'>
    readonly created_at: FieldRef<"purchases", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * purchases findUnique
   */
  export type purchasesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the purchases
     */
    select?: purchasesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the purchases
     */
    omit?: purchasesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: purchasesInclude<ExtArgs> | null
    /**
     * Filter, which purchases to fetch.
     */
    where: purchasesWhereUniqueInput
  }

  /**
   * purchases findUniqueOrThrow
   */
  export type purchasesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the purchases
     */
    select?: purchasesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the purchases
     */
    omit?: purchasesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: purchasesInclude<ExtArgs> | null
    /**
     * Filter, which purchases to fetch.
     */
    where: purchasesWhereUniqueInput
  }

  /**
   * purchases findFirst
   */
  export type purchasesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the purchases
     */
    select?: purchasesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the purchases
     */
    omit?: purchasesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: purchasesInclude<ExtArgs> | null
    /**
     * Filter, which purchases to fetch.
     */
    where?: purchasesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of purchases to fetch.
     */
    orderBy?: purchasesOrderByWithRelationInput | purchasesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for purchases.
     */
    cursor?: purchasesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` purchases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` purchases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of purchases.
     */
    distinct?: PurchasesScalarFieldEnum | PurchasesScalarFieldEnum[]
  }

  /**
   * purchases findFirstOrThrow
   */
  export type purchasesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the purchases
     */
    select?: purchasesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the purchases
     */
    omit?: purchasesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: purchasesInclude<ExtArgs> | null
    /**
     * Filter, which purchases to fetch.
     */
    where?: purchasesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of purchases to fetch.
     */
    orderBy?: purchasesOrderByWithRelationInput | purchasesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for purchases.
     */
    cursor?: purchasesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` purchases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` purchases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of purchases.
     */
    distinct?: PurchasesScalarFieldEnum | PurchasesScalarFieldEnum[]
  }

  /**
   * purchases findMany
   */
  export type purchasesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the purchases
     */
    select?: purchasesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the purchases
     */
    omit?: purchasesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: purchasesInclude<ExtArgs> | null
    /**
     * Filter, which purchases to fetch.
     */
    where?: purchasesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of purchases to fetch.
     */
    orderBy?: purchasesOrderByWithRelationInput | purchasesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing purchases.
     */
    cursor?: purchasesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` purchases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` purchases.
     */
    skip?: number
    distinct?: PurchasesScalarFieldEnum | PurchasesScalarFieldEnum[]
  }

  /**
   * purchases create
   */
  export type purchasesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the purchases
     */
    select?: purchasesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the purchases
     */
    omit?: purchasesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: purchasesInclude<ExtArgs> | null
    /**
     * The data needed to create a purchases.
     */
    data: XOR<purchasesCreateInput, purchasesUncheckedCreateInput>
  }

  /**
   * purchases createMany
   */
  export type purchasesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many purchases.
     */
    data: purchasesCreateManyInput | purchasesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * purchases createManyAndReturn
   */
  export type purchasesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the purchases
     */
    select?: purchasesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the purchases
     */
    omit?: purchasesOmit<ExtArgs> | null
    /**
     * The data used to create many purchases.
     */
    data: purchasesCreateManyInput | purchasesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: purchasesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * purchases update
   */
  export type purchasesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the purchases
     */
    select?: purchasesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the purchases
     */
    omit?: purchasesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: purchasesInclude<ExtArgs> | null
    /**
     * The data needed to update a purchases.
     */
    data: XOR<purchasesUpdateInput, purchasesUncheckedUpdateInput>
    /**
     * Choose, which purchases to update.
     */
    where: purchasesWhereUniqueInput
  }

  /**
   * purchases updateMany
   */
  export type purchasesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update purchases.
     */
    data: XOR<purchasesUpdateManyMutationInput, purchasesUncheckedUpdateManyInput>
    /**
     * Filter which purchases to update
     */
    where?: purchasesWhereInput
    /**
     * Limit how many purchases to update.
     */
    limit?: number
  }

  /**
   * purchases updateManyAndReturn
   */
  export type purchasesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the purchases
     */
    select?: purchasesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the purchases
     */
    omit?: purchasesOmit<ExtArgs> | null
    /**
     * The data used to update purchases.
     */
    data: XOR<purchasesUpdateManyMutationInput, purchasesUncheckedUpdateManyInput>
    /**
     * Filter which purchases to update
     */
    where?: purchasesWhereInput
    /**
     * Limit how many purchases to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: purchasesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * purchases upsert
   */
  export type purchasesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the purchases
     */
    select?: purchasesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the purchases
     */
    omit?: purchasesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: purchasesInclude<ExtArgs> | null
    /**
     * The filter to search for the purchases to update in case it exists.
     */
    where: purchasesWhereUniqueInput
    /**
     * In case the purchases found by the `where` argument doesn't exist, create a new purchases with this data.
     */
    create: XOR<purchasesCreateInput, purchasesUncheckedCreateInput>
    /**
     * In case the purchases was found with the provided `where` argument, update it with this data.
     */
    update: XOR<purchasesUpdateInput, purchasesUncheckedUpdateInput>
  }

  /**
   * purchases delete
   */
  export type purchasesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the purchases
     */
    select?: purchasesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the purchases
     */
    omit?: purchasesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: purchasesInclude<ExtArgs> | null
    /**
     * Filter which purchases to delete.
     */
    where: purchasesWhereUniqueInput
  }

  /**
   * purchases deleteMany
   */
  export type purchasesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which purchases to delete
     */
    where?: purchasesWhereInput
    /**
     * Limit how many purchases to delete.
     */
    limit?: number
  }

  /**
   * purchases.users_purchases_approved_byTousers
   */
  export type purchases$users_purchases_approved_byTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    where?: usersWhereInput
  }

  /**
   * purchases without action
   */
  export type purchasesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the purchases
     */
    select?: purchasesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the purchases
     */
    omit?: purchasesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: purchasesInclude<ExtArgs> | null
  }


  /**
   * Model transfers
   */

  export type AggregateTransfers = {
    _count: TransfersCountAggregateOutputType | null
    _avg: TransfersAvgAggregateOutputType | null
    _sum: TransfersSumAggregateOutputType | null
    _min: TransfersMinAggregateOutputType | null
    _max: TransfersMaxAggregateOutputType | null
  }

  export type TransfersAvgAggregateOutputType = {
    quantity: number | null
  }

  export type TransfersSumAggregateOutputType = {
    quantity: number | null
  }

  export type TransfersMinAggregateOutputType = {
    id: string | null
    transfer_number: string | null
    from_base_id: string | null
    to_base_id: string | null
    asset_name: string | null
    quantity: number | null
    transfer_date: Date | null
    status: string | null
    approved_by: string | null
    approved_at: Date | null
    notes: string | null
    created_by: string | null
    created_at: Date | null
  }

  export type TransfersMaxAggregateOutputType = {
    id: string | null
    transfer_number: string | null
    from_base_id: string | null
    to_base_id: string | null
    asset_name: string | null
    quantity: number | null
    transfer_date: Date | null
    status: string | null
    approved_by: string | null
    approved_at: Date | null
    notes: string | null
    created_by: string | null
    created_at: Date | null
  }

  export type TransfersCountAggregateOutputType = {
    id: number
    transfer_number: number
    from_base_id: number
    to_base_id: number
    asset_name: number
    quantity: number
    transfer_date: number
    status: number
    approved_by: number
    approved_at: number
    notes: number
    created_by: number
    created_at: number
    _all: number
  }


  export type TransfersAvgAggregateInputType = {
    quantity?: true
  }

  export type TransfersSumAggregateInputType = {
    quantity?: true
  }

  export type TransfersMinAggregateInputType = {
    id?: true
    transfer_number?: true
    from_base_id?: true
    to_base_id?: true
    asset_name?: true
    quantity?: true
    transfer_date?: true
    status?: true
    approved_by?: true
    approved_at?: true
    notes?: true
    created_by?: true
    created_at?: true
  }

  export type TransfersMaxAggregateInputType = {
    id?: true
    transfer_number?: true
    from_base_id?: true
    to_base_id?: true
    asset_name?: true
    quantity?: true
    transfer_date?: true
    status?: true
    approved_by?: true
    approved_at?: true
    notes?: true
    created_by?: true
    created_at?: true
  }

  export type TransfersCountAggregateInputType = {
    id?: true
    transfer_number?: true
    from_base_id?: true
    to_base_id?: true
    asset_name?: true
    quantity?: true
    transfer_date?: true
    status?: true
    approved_by?: true
    approved_at?: true
    notes?: true
    created_by?: true
    created_at?: true
    _all?: true
  }

  export type TransfersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which transfers to aggregate.
     */
    where?: transfersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of transfers to fetch.
     */
    orderBy?: transfersOrderByWithRelationInput | transfersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: transfersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` transfers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` transfers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned transfers
    **/
    _count?: true | TransfersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TransfersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TransfersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransfersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransfersMaxAggregateInputType
  }

  export type GetTransfersAggregateType<T extends TransfersAggregateArgs> = {
        [P in keyof T & keyof AggregateTransfers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransfers[P]>
      : GetScalarType<T[P], AggregateTransfers[P]>
  }




  export type transfersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: transfersWhereInput
    orderBy?: transfersOrderByWithAggregationInput | transfersOrderByWithAggregationInput[]
    by: TransfersScalarFieldEnum[] | TransfersScalarFieldEnum
    having?: transfersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransfersCountAggregateInputType | true
    _avg?: TransfersAvgAggregateInputType
    _sum?: TransfersSumAggregateInputType
    _min?: TransfersMinAggregateInputType
    _max?: TransfersMaxAggregateInputType
  }

  export type TransfersGroupByOutputType = {
    id: string
    transfer_number: string
    from_base_id: string
    to_base_id: string
    asset_name: string
    quantity: number
    transfer_date: Date
    status: string
    approved_by: string | null
    approved_at: Date | null
    notes: string | null
    created_by: string
    created_at: Date | null
    _count: TransfersCountAggregateOutputType | null
    _avg: TransfersAvgAggregateOutputType | null
    _sum: TransfersSumAggregateOutputType | null
    _min: TransfersMinAggregateOutputType | null
    _max: TransfersMaxAggregateOutputType | null
  }

  type GetTransfersGroupByPayload<T extends transfersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TransfersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransfersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransfersGroupByOutputType[P]>
            : GetScalarType<T[P], TransfersGroupByOutputType[P]>
        }
      >
    >


  export type transfersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    transfer_number?: boolean
    from_base_id?: boolean
    to_base_id?: boolean
    asset_name?: boolean
    quantity?: boolean
    transfer_date?: boolean
    status?: boolean
    approved_by?: boolean
    approved_at?: boolean
    notes?: boolean
    created_by?: boolean
    created_at?: boolean
    users_transfers_approved_byTousers?: boolean | transfers$users_transfers_approved_byTousersArgs<ExtArgs>
    users_transfers_created_byTousers?: boolean | usersDefaultArgs<ExtArgs>
    bases_transfers_from_base_idTobases?: boolean | basesDefaultArgs<ExtArgs>
    bases_transfers_to_base_idTobases?: boolean | basesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transfers"]>

  export type transfersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    transfer_number?: boolean
    from_base_id?: boolean
    to_base_id?: boolean
    asset_name?: boolean
    quantity?: boolean
    transfer_date?: boolean
    status?: boolean
    approved_by?: boolean
    approved_at?: boolean
    notes?: boolean
    created_by?: boolean
    created_at?: boolean
    users_transfers_approved_byTousers?: boolean | transfers$users_transfers_approved_byTousersArgs<ExtArgs>
    users_transfers_created_byTousers?: boolean | usersDefaultArgs<ExtArgs>
    bases_transfers_from_base_idTobases?: boolean | basesDefaultArgs<ExtArgs>
    bases_transfers_to_base_idTobases?: boolean | basesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transfers"]>

  export type transfersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    transfer_number?: boolean
    from_base_id?: boolean
    to_base_id?: boolean
    asset_name?: boolean
    quantity?: boolean
    transfer_date?: boolean
    status?: boolean
    approved_by?: boolean
    approved_at?: boolean
    notes?: boolean
    created_by?: boolean
    created_at?: boolean
    users_transfers_approved_byTousers?: boolean | transfers$users_transfers_approved_byTousersArgs<ExtArgs>
    users_transfers_created_byTousers?: boolean | usersDefaultArgs<ExtArgs>
    bases_transfers_from_base_idTobases?: boolean | basesDefaultArgs<ExtArgs>
    bases_transfers_to_base_idTobases?: boolean | basesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transfers"]>

  export type transfersSelectScalar = {
    id?: boolean
    transfer_number?: boolean
    from_base_id?: boolean
    to_base_id?: boolean
    asset_name?: boolean
    quantity?: boolean
    transfer_date?: boolean
    status?: boolean
    approved_by?: boolean
    approved_at?: boolean
    notes?: boolean
    created_by?: boolean
    created_at?: boolean
  }

  export type transfersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "transfer_number" | "from_base_id" | "to_base_id" | "asset_name" | "quantity" | "transfer_date" | "status" | "approved_by" | "approved_at" | "notes" | "created_by" | "created_at", ExtArgs["result"]["transfers"]>
  export type transfersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users_transfers_approved_byTousers?: boolean | transfers$users_transfers_approved_byTousersArgs<ExtArgs>
    users_transfers_created_byTousers?: boolean | usersDefaultArgs<ExtArgs>
    bases_transfers_from_base_idTobases?: boolean | basesDefaultArgs<ExtArgs>
    bases_transfers_to_base_idTobases?: boolean | basesDefaultArgs<ExtArgs>
  }
  export type transfersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users_transfers_approved_byTousers?: boolean | transfers$users_transfers_approved_byTousersArgs<ExtArgs>
    users_transfers_created_byTousers?: boolean | usersDefaultArgs<ExtArgs>
    bases_transfers_from_base_idTobases?: boolean | basesDefaultArgs<ExtArgs>
    bases_transfers_to_base_idTobases?: boolean | basesDefaultArgs<ExtArgs>
  }
  export type transfersIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users_transfers_approved_byTousers?: boolean | transfers$users_transfers_approved_byTousersArgs<ExtArgs>
    users_transfers_created_byTousers?: boolean | usersDefaultArgs<ExtArgs>
    bases_transfers_from_base_idTobases?: boolean | basesDefaultArgs<ExtArgs>
    bases_transfers_to_base_idTobases?: boolean | basesDefaultArgs<ExtArgs>
  }

  export type $transfersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "transfers"
    objects: {
      users_transfers_approved_byTousers: Prisma.$usersPayload<ExtArgs> | null
      users_transfers_created_byTousers: Prisma.$usersPayload<ExtArgs>
      bases_transfers_from_base_idTobases: Prisma.$basesPayload<ExtArgs>
      bases_transfers_to_base_idTobases: Prisma.$basesPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      transfer_number: string
      from_base_id: string
      to_base_id: string
      asset_name: string
      quantity: number
      transfer_date: Date
      status: string
      approved_by: string | null
      approved_at: Date | null
      notes: string | null
      created_by: string
      created_at: Date | null
    }, ExtArgs["result"]["transfers"]>
    composites: {}
  }

  type transfersGetPayload<S extends boolean | null | undefined | transfersDefaultArgs> = $Result.GetResult<Prisma.$transfersPayload, S>

  type transfersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<transfersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TransfersCountAggregateInputType | true
    }

  export interface transfersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['transfers'], meta: { name: 'transfers' } }
    /**
     * Find zero or one Transfers that matches the filter.
     * @param {transfersFindUniqueArgs} args - Arguments to find a Transfers
     * @example
     * // Get one Transfers
     * const transfers = await prisma.transfers.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends transfersFindUniqueArgs>(args: SelectSubset<T, transfersFindUniqueArgs<ExtArgs>>): Prisma__transfersClient<$Result.GetResult<Prisma.$transfersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Transfers that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {transfersFindUniqueOrThrowArgs} args - Arguments to find a Transfers
     * @example
     * // Get one Transfers
     * const transfers = await prisma.transfers.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends transfersFindUniqueOrThrowArgs>(args: SelectSubset<T, transfersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__transfersClient<$Result.GetResult<Prisma.$transfersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transfers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {transfersFindFirstArgs} args - Arguments to find a Transfers
     * @example
     * // Get one Transfers
     * const transfers = await prisma.transfers.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends transfersFindFirstArgs>(args?: SelectSubset<T, transfersFindFirstArgs<ExtArgs>>): Prisma__transfersClient<$Result.GetResult<Prisma.$transfersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transfers that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {transfersFindFirstOrThrowArgs} args - Arguments to find a Transfers
     * @example
     * // Get one Transfers
     * const transfers = await prisma.transfers.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends transfersFindFirstOrThrowArgs>(args?: SelectSubset<T, transfersFindFirstOrThrowArgs<ExtArgs>>): Prisma__transfersClient<$Result.GetResult<Prisma.$transfersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Transfers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {transfersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Transfers
     * const transfers = await prisma.transfers.findMany()
     * 
     * // Get first 10 Transfers
     * const transfers = await prisma.transfers.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transfersWithIdOnly = await prisma.transfers.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends transfersFindManyArgs>(args?: SelectSubset<T, transfersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$transfersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Transfers.
     * @param {transfersCreateArgs} args - Arguments to create a Transfers.
     * @example
     * // Create one Transfers
     * const Transfers = await prisma.transfers.create({
     *   data: {
     *     // ... data to create a Transfers
     *   }
     * })
     * 
     */
    create<T extends transfersCreateArgs>(args: SelectSubset<T, transfersCreateArgs<ExtArgs>>): Prisma__transfersClient<$Result.GetResult<Prisma.$transfersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Transfers.
     * @param {transfersCreateManyArgs} args - Arguments to create many Transfers.
     * @example
     * // Create many Transfers
     * const transfers = await prisma.transfers.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends transfersCreateManyArgs>(args?: SelectSubset<T, transfersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Transfers and returns the data saved in the database.
     * @param {transfersCreateManyAndReturnArgs} args - Arguments to create many Transfers.
     * @example
     * // Create many Transfers
     * const transfers = await prisma.transfers.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Transfers and only return the `id`
     * const transfersWithIdOnly = await prisma.transfers.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends transfersCreateManyAndReturnArgs>(args?: SelectSubset<T, transfersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$transfersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Transfers.
     * @param {transfersDeleteArgs} args - Arguments to delete one Transfers.
     * @example
     * // Delete one Transfers
     * const Transfers = await prisma.transfers.delete({
     *   where: {
     *     // ... filter to delete one Transfers
     *   }
     * })
     * 
     */
    delete<T extends transfersDeleteArgs>(args: SelectSubset<T, transfersDeleteArgs<ExtArgs>>): Prisma__transfersClient<$Result.GetResult<Prisma.$transfersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Transfers.
     * @param {transfersUpdateArgs} args - Arguments to update one Transfers.
     * @example
     * // Update one Transfers
     * const transfers = await prisma.transfers.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends transfersUpdateArgs>(args: SelectSubset<T, transfersUpdateArgs<ExtArgs>>): Prisma__transfersClient<$Result.GetResult<Prisma.$transfersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Transfers.
     * @param {transfersDeleteManyArgs} args - Arguments to filter Transfers to delete.
     * @example
     * // Delete a few Transfers
     * const { count } = await prisma.transfers.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends transfersDeleteManyArgs>(args?: SelectSubset<T, transfersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transfers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {transfersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Transfers
     * const transfers = await prisma.transfers.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends transfersUpdateManyArgs>(args: SelectSubset<T, transfersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transfers and returns the data updated in the database.
     * @param {transfersUpdateManyAndReturnArgs} args - Arguments to update many Transfers.
     * @example
     * // Update many Transfers
     * const transfers = await prisma.transfers.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Transfers and only return the `id`
     * const transfersWithIdOnly = await prisma.transfers.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends transfersUpdateManyAndReturnArgs>(args: SelectSubset<T, transfersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$transfersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Transfers.
     * @param {transfersUpsertArgs} args - Arguments to update or create a Transfers.
     * @example
     * // Update or create a Transfers
     * const transfers = await prisma.transfers.upsert({
     *   create: {
     *     // ... data to create a Transfers
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Transfers we want to update
     *   }
     * })
     */
    upsert<T extends transfersUpsertArgs>(args: SelectSubset<T, transfersUpsertArgs<ExtArgs>>): Prisma__transfersClient<$Result.GetResult<Prisma.$transfersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Transfers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {transfersCountArgs} args - Arguments to filter Transfers to count.
     * @example
     * // Count the number of Transfers
     * const count = await prisma.transfers.count({
     *   where: {
     *     // ... the filter for the Transfers we want to count
     *   }
     * })
    **/
    count<T extends transfersCountArgs>(
      args?: Subset<T, transfersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransfersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Transfers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransfersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TransfersAggregateArgs>(args: Subset<T, TransfersAggregateArgs>): Prisma.PrismaPromise<GetTransfersAggregateType<T>>

    /**
     * Group by Transfers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {transfersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends transfersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: transfersGroupByArgs['orderBy'] }
        : { orderBy?: transfersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, transfersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransfersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the transfers model
   */
  readonly fields: transfersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for transfers.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__transfersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users_transfers_approved_byTousers<T extends transfers$users_transfers_approved_byTousersArgs<ExtArgs> = {}>(args?: Subset<T, transfers$users_transfers_approved_byTousersArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    users_transfers_created_byTousers<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    bases_transfers_from_base_idTobases<T extends basesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, basesDefaultArgs<ExtArgs>>): Prisma__basesClient<$Result.GetResult<Prisma.$basesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    bases_transfers_to_base_idTobases<T extends basesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, basesDefaultArgs<ExtArgs>>): Prisma__basesClient<$Result.GetResult<Prisma.$basesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the transfers model
   */
  interface transfersFieldRefs {
    readonly id: FieldRef<"transfers", 'String'>
    readonly transfer_number: FieldRef<"transfers", 'String'>
    readonly from_base_id: FieldRef<"transfers", 'String'>
    readonly to_base_id: FieldRef<"transfers", 'String'>
    readonly asset_name: FieldRef<"transfers", 'String'>
    readonly quantity: FieldRef<"transfers", 'Int'>
    readonly transfer_date: FieldRef<"transfers", 'DateTime'>
    readonly status: FieldRef<"transfers", 'String'>
    readonly approved_by: FieldRef<"transfers", 'String'>
    readonly approved_at: FieldRef<"transfers", 'DateTime'>
    readonly notes: FieldRef<"transfers", 'String'>
    readonly created_by: FieldRef<"transfers", 'String'>
    readonly created_at: FieldRef<"transfers", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * transfers findUnique
   */
  export type transfersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transfers
     */
    select?: transfersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transfers
     */
    omit?: transfersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transfersInclude<ExtArgs> | null
    /**
     * Filter, which transfers to fetch.
     */
    where: transfersWhereUniqueInput
  }

  /**
   * transfers findUniqueOrThrow
   */
  export type transfersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transfers
     */
    select?: transfersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transfers
     */
    omit?: transfersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transfersInclude<ExtArgs> | null
    /**
     * Filter, which transfers to fetch.
     */
    where: transfersWhereUniqueInput
  }

  /**
   * transfers findFirst
   */
  export type transfersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transfers
     */
    select?: transfersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transfers
     */
    omit?: transfersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transfersInclude<ExtArgs> | null
    /**
     * Filter, which transfers to fetch.
     */
    where?: transfersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of transfers to fetch.
     */
    orderBy?: transfersOrderByWithRelationInput | transfersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for transfers.
     */
    cursor?: transfersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` transfers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` transfers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of transfers.
     */
    distinct?: TransfersScalarFieldEnum | TransfersScalarFieldEnum[]
  }

  /**
   * transfers findFirstOrThrow
   */
  export type transfersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transfers
     */
    select?: transfersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transfers
     */
    omit?: transfersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transfersInclude<ExtArgs> | null
    /**
     * Filter, which transfers to fetch.
     */
    where?: transfersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of transfers to fetch.
     */
    orderBy?: transfersOrderByWithRelationInput | transfersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for transfers.
     */
    cursor?: transfersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` transfers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` transfers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of transfers.
     */
    distinct?: TransfersScalarFieldEnum | TransfersScalarFieldEnum[]
  }

  /**
   * transfers findMany
   */
  export type transfersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transfers
     */
    select?: transfersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transfers
     */
    omit?: transfersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transfersInclude<ExtArgs> | null
    /**
     * Filter, which transfers to fetch.
     */
    where?: transfersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of transfers to fetch.
     */
    orderBy?: transfersOrderByWithRelationInput | transfersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing transfers.
     */
    cursor?: transfersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` transfers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` transfers.
     */
    skip?: number
    distinct?: TransfersScalarFieldEnum | TransfersScalarFieldEnum[]
  }

  /**
   * transfers create
   */
  export type transfersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transfers
     */
    select?: transfersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transfers
     */
    omit?: transfersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transfersInclude<ExtArgs> | null
    /**
     * The data needed to create a transfers.
     */
    data: XOR<transfersCreateInput, transfersUncheckedCreateInput>
  }

  /**
   * transfers createMany
   */
  export type transfersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many transfers.
     */
    data: transfersCreateManyInput | transfersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * transfers createManyAndReturn
   */
  export type transfersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transfers
     */
    select?: transfersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the transfers
     */
    omit?: transfersOmit<ExtArgs> | null
    /**
     * The data used to create many transfers.
     */
    data: transfersCreateManyInput | transfersCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transfersIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * transfers update
   */
  export type transfersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transfers
     */
    select?: transfersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transfers
     */
    omit?: transfersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transfersInclude<ExtArgs> | null
    /**
     * The data needed to update a transfers.
     */
    data: XOR<transfersUpdateInput, transfersUncheckedUpdateInput>
    /**
     * Choose, which transfers to update.
     */
    where: transfersWhereUniqueInput
  }

  /**
   * transfers updateMany
   */
  export type transfersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update transfers.
     */
    data: XOR<transfersUpdateManyMutationInput, transfersUncheckedUpdateManyInput>
    /**
     * Filter which transfers to update
     */
    where?: transfersWhereInput
    /**
     * Limit how many transfers to update.
     */
    limit?: number
  }

  /**
   * transfers updateManyAndReturn
   */
  export type transfersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transfers
     */
    select?: transfersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the transfers
     */
    omit?: transfersOmit<ExtArgs> | null
    /**
     * The data used to update transfers.
     */
    data: XOR<transfersUpdateManyMutationInput, transfersUncheckedUpdateManyInput>
    /**
     * Filter which transfers to update
     */
    where?: transfersWhereInput
    /**
     * Limit how many transfers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transfersIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * transfers upsert
   */
  export type transfersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transfers
     */
    select?: transfersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transfers
     */
    omit?: transfersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transfersInclude<ExtArgs> | null
    /**
     * The filter to search for the transfers to update in case it exists.
     */
    where: transfersWhereUniqueInput
    /**
     * In case the transfers found by the `where` argument doesn't exist, create a new transfers with this data.
     */
    create: XOR<transfersCreateInput, transfersUncheckedCreateInput>
    /**
     * In case the transfers was found with the provided `where` argument, update it with this data.
     */
    update: XOR<transfersUpdateInput, transfersUncheckedUpdateInput>
  }

  /**
   * transfers delete
   */
  export type transfersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transfers
     */
    select?: transfersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transfers
     */
    omit?: transfersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transfersInclude<ExtArgs> | null
    /**
     * Filter which transfers to delete.
     */
    where: transfersWhereUniqueInput
  }

  /**
   * transfers deleteMany
   */
  export type transfersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which transfers to delete
     */
    where?: transfersWhereInput
    /**
     * Limit how many transfers to delete.
     */
    limit?: number
  }

  /**
   * transfers.users_transfers_approved_byTousers
   */
  export type transfers$users_transfers_approved_byTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    where?: usersWhereInput
  }

  /**
   * transfers without action
   */
  export type transfersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transfers
     */
    select?: transfersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transfers
     */
    omit?: transfersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transfersInclude<ExtArgs> | null
  }


  /**
   * Model users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersMinAggregateOutputType = {
    id: string | null
    username: string | null
    email: string | null
    password_hash: string | null
    first_name: string | null
    last_name: string | null
    role: string | null
    base_id: string | null
    is_active: boolean | null
    created_at: Date | null
  }

  export type UsersMaxAggregateOutputType = {
    id: string | null
    username: string | null
    email: string | null
    password_hash: string | null
    first_name: string | null
    last_name: string | null
    role: string | null
    base_id: string | null
    is_active: boolean | null
    created_at: Date | null
  }

  export type UsersCountAggregateOutputType = {
    id: number
    username: number
    email: number
    password_hash: number
    first_name: number
    last_name: number
    role: number
    base_id: number
    is_active: number
    created_at: number
    _all: number
  }


  export type UsersMinAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password_hash?: true
    first_name?: true
    last_name?: true
    role?: true
    base_id?: true
    is_active?: true
    created_at?: true
  }

  export type UsersMaxAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password_hash?: true
    first_name?: true
    last_name?: true
    role?: true
    base_id?: true
    is_active?: true
    created_at?: true
  }

  export type UsersCountAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password_hash?: true
    first_name?: true
    last_name?: true
    role?: true
    base_id?: true
    is_active?: true
    created_at?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to aggregate.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type usersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
    orderBy?: usersOrderByWithAggregationInput | usersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: usersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    id: string
    username: string
    email: string
    password_hash: string
    first_name: string
    last_name: string
    role: string
    base_id: string | null
    is_active: boolean | null
    created_at: Date | null
    _count: UsersCountAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends usersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type usersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password_hash?: boolean
    first_name?: boolean
    last_name?: boolean
    role?: boolean
    base_id?: boolean
    is_active?: boolean
    created_at?: boolean
    assignments?: boolean | users$assignmentsArgs<ExtArgs>
    audit_logs?: boolean | users$audit_logsArgs<ExtArgs>
    bases_bases_commander_idTousers?: boolean | users$bases_bases_commander_idTousersArgs<ExtArgs>
    expenditures_expenditures_authorized_byTousers?: boolean | users$expenditures_expenditures_authorized_byTousersArgs<ExtArgs>
    expenditures_expenditures_created_byTousers?: boolean | users$expenditures_expenditures_created_byTousersArgs<ExtArgs>
    purchases_purchases_approved_byTousers?: boolean | users$purchases_purchases_approved_byTousersArgs<ExtArgs>
    purchases_purchases_created_byTousers?: boolean | users$purchases_purchases_created_byTousersArgs<ExtArgs>
    transfers_transfers_approved_byTousers?: boolean | users$transfers_transfers_approved_byTousersArgs<ExtArgs>
    transfers_transfers_created_byTousers?: boolean | users$transfers_transfers_created_byTousersArgs<ExtArgs>
    bases_users_base_idTobases?: boolean | users$bases_users_base_idTobasesArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>

  export type usersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password_hash?: boolean
    first_name?: boolean
    last_name?: boolean
    role?: boolean
    base_id?: boolean
    is_active?: boolean
    created_at?: boolean
    bases_users_base_idTobases?: boolean | users$bases_users_base_idTobasesArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>

  export type usersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password_hash?: boolean
    first_name?: boolean
    last_name?: boolean
    role?: boolean
    base_id?: boolean
    is_active?: boolean
    created_at?: boolean
    bases_users_base_idTobases?: boolean | users$bases_users_base_idTobasesArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>

  export type usersSelectScalar = {
    id?: boolean
    username?: boolean
    email?: boolean
    password_hash?: boolean
    first_name?: boolean
    last_name?: boolean
    role?: boolean
    base_id?: boolean
    is_active?: boolean
    created_at?: boolean
  }

  export type usersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "email" | "password_hash" | "first_name" | "last_name" | "role" | "base_id" | "is_active" | "created_at", ExtArgs["result"]["users"]>
  export type usersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignments?: boolean | users$assignmentsArgs<ExtArgs>
    audit_logs?: boolean | users$audit_logsArgs<ExtArgs>
    bases_bases_commander_idTousers?: boolean | users$bases_bases_commander_idTousersArgs<ExtArgs>
    expenditures_expenditures_authorized_byTousers?: boolean | users$expenditures_expenditures_authorized_byTousersArgs<ExtArgs>
    expenditures_expenditures_created_byTousers?: boolean | users$expenditures_expenditures_created_byTousersArgs<ExtArgs>
    purchases_purchases_approved_byTousers?: boolean | users$purchases_purchases_approved_byTousersArgs<ExtArgs>
    purchases_purchases_created_byTousers?: boolean | users$purchases_purchases_created_byTousersArgs<ExtArgs>
    transfers_transfers_approved_byTousers?: boolean | users$transfers_transfers_approved_byTousersArgs<ExtArgs>
    transfers_transfers_created_byTousers?: boolean | users$transfers_transfers_created_byTousersArgs<ExtArgs>
    bases_users_base_idTobases?: boolean | users$bases_users_base_idTobasesArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type usersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bases_users_base_idTobases?: boolean | users$bases_users_base_idTobasesArgs<ExtArgs>
  }
  export type usersIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bases_users_base_idTobases?: boolean | users$bases_users_base_idTobasesArgs<ExtArgs>
  }

  export type $usersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "users"
    objects: {
      assignments: Prisma.$assignmentsPayload<ExtArgs>[]
      audit_logs: Prisma.$audit_logsPayload<ExtArgs>[]
      bases_bases_commander_idTousers: Prisma.$basesPayload<ExtArgs>[]
      expenditures_expenditures_authorized_byTousers: Prisma.$expendituresPayload<ExtArgs>[]
      expenditures_expenditures_created_byTousers: Prisma.$expendituresPayload<ExtArgs>[]
      purchases_purchases_approved_byTousers: Prisma.$purchasesPayload<ExtArgs>[]
      purchases_purchases_created_byTousers: Prisma.$purchasesPayload<ExtArgs>[]
      transfers_transfers_approved_byTousers: Prisma.$transfersPayload<ExtArgs>[]
      transfers_transfers_created_byTousers: Prisma.$transfersPayload<ExtArgs>[]
      bases_users_base_idTobases: Prisma.$basesPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      email: string
      password_hash: string
      first_name: string
      last_name: string
      role: string
      base_id: string | null
      is_active: boolean | null
      created_at: Date | null
    }, ExtArgs["result"]["users"]>
    composites: {}
  }

  type usersGetPayload<S extends boolean | null | undefined | usersDefaultArgs> = $Result.GetResult<Prisma.$usersPayload, S>

  type usersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<usersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface usersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['users'], meta: { name: 'users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {usersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usersFindUniqueArgs>(args: SelectSubset<T, usersFindUniqueArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Users that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {usersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usersFindUniqueOrThrowArgs>(args: SelectSubset<T, usersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usersFindFirstArgs>(args?: SelectSubset<T, usersFindFirstArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usersFindFirstOrThrowArgs>(args?: SelectSubset<T, usersFindFirstOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usersWithIdOnly = await prisma.users.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends usersFindManyArgs>(args?: SelectSubset<T, usersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Users.
     * @param {usersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
     */
    create<T extends usersCreateArgs>(args: SelectSubset<T, usersCreateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {usersCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends usersCreateManyArgs>(args?: SelectSubset<T, usersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {usersCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends usersCreateManyAndReturnArgs>(args?: SelectSubset<T, usersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Users.
     * @param {usersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
     */
    delete<T extends usersDeleteArgs>(args: SelectSubset<T, usersDeleteArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Users.
     * @param {usersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends usersUpdateArgs>(args: SelectSubset<T, usersUpdateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {usersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends usersDeleteManyArgs>(args?: SelectSubset<T, usersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends usersUpdateManyArgs>(args: SelectSubset<T, usersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {usersUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends usersUpdateManyAndReturnArgs>(args: SelectSubset<T, usersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Users.
     * @param {usersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
     */
    upsert<T extends usersUpsertArgs>(args: SelectSubset<T, usersUpsertArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends usersCountArgs>(
      args?: Subset<T, usersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends usersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: usersGroupByArgs['orderBy'] }
        : { orderBy?: usersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, usersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the users model
   */
  readonly fields: usersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__usersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    assignments<T extends users$assignmentsArgs<ExtArgs> = {}>(args?: Subset<T, users$assignmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$assignmentsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    audit_logs<T extends users$audit_logsArgs<ExtArgs> = {}>(args?: Subset<T, users$audit_logsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$audit_logsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    bases_bases_commander_idTousers<T extends users$bases_bases_commander_idTousersArgs<ExtArgs> = {}>(args?: Subset<T, users$bases_bases_commander_idTousersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$basesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    expenditures_expenditures_authorized_byTousers<T extends users$expenditures_expenditures_authorized_byTousersArgs<ExtArgs> = {}>(args?: Subset<T, users$expenditures_expenditures_authorized_byTousersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$expendituresPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    expenditures_expenditures_created_byTousers<T extends users$expenditures_expenditures_created_byTousersArgs<ExtArgs> = {}>(args?: Subset<T, users$expenditures_expenditures_created_byTousersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$expendituresPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    purchases_purchases_approved_byTousers<T extends users$purchases_purchases_approved_byTousersArgs<ExtArgs> = {}>(args?: Subset<T, users$purchases_purchases_approved_byTousersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$purchasesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    purchases_purchases_created_byTousers<T extends users$purchases_purchases_created_byTousersArgs<ExtArgs> = {}>(args?: Subset<T, users$purchases_purchases_created_byTousersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$purchasesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    transfers_transfers_approved_byTousers<T extends users$transfers_transfers_approved_byTousersArgs<ExtArgs> = {}>(args?: Subset<T, users$transfers_transfers_approved_byTousersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$transfersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    transfers_transfers_created_byTousers<T extends users$transfers_transfers_created_byTousersArgs<ExtArgs> = {}>(args?: Subset<T, users$transfers_transfers_created_byTousersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$transfersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    bases_users_base_idTobases<T extends users$bases_users_base_idTobasesArgs<ExtArgs> = {}>(args?: Subset<T, users$bases_users_base_idTobasesArgs<ExtArgs>>): Prisma__basesClient<$Result.GetResult<Prisma.$basesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the users model
   */
  interface usersFieldRefs {
    readonly id: FieldRef<"users", 'String'>
    readonly username: FieldRef<"users", 'String'>
    readonly email: FieldRef<"users", 'String'>
    readonly password_hash: FieldRef<"users", 'String'>
    readonly first_name: FieldRef<"users", 'String'>
    readonly last_name: FieldRef<"users", 'String'>
    readonly role: FieldRef<"users", 'String'>
    readonly base_id: FieldRef<"users", 'String'>
    readonly is_active: FieldRef<"users", 'Boolean'>
    readonly created_at: FieldRef<"users", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * users findUnique
   */
  export type usersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findUniqueOrThrow
   */
  export type usersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findFirst
   */
  export type usersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findFirstOrThrow
   */
  export type usersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findMany
   */
  export type usersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users create
   */
  export type usersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to create a users.
     */
    data: XOR<usersCreateInput, usersUncheckedCreateInput>
  }

  /**
   * users createMany
   */
  export type usersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users createManyAndReturn
   */
  export type usersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * users update
   */
  export type usersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to update a users.
     */
    data: XOR<usersUpdateInput, usersUncheckedUpdateInput>
    /**
     * Choose, which users to update.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users updateMany
   */
  export type usersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users updateManyAndReturn
   */
  export type usersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * users upsert
   */
  export type usersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The filter to search for the users to update in case it exists.
     */
    where: usersWhereUniqueInput
    /**
     * In case the users found by the `where` argument doesn't exist, create a new users with this data.
     */
    create: XOR<usersCreateInput, usersUncheckedCreateInput>
    /**
     * In case the users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usersUpdateInput, usersUncheckedUpdateInput>
  }

  /**
   * users delete
   */
  export type usersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter which users to delete.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users deleteMany
   */
  export type usersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: usersWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * users.assignments
   */
  export type users$assignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the assignments
     */
    select?: assignmentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the assignments
     */
    omit?: assignmentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: assignmentsInclude<ExtArgs> | null
    where?: assignmentsWhereInput
    orderBy?: assignmentsOrderByWithRelationInput | assignmentsOrderByWithRelationInput[]
    cursor?: assignmentsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AssignmentsScalarFieldEnum | AssignmentsScalarFieldEnum[]
  }

  /**
   * users.audit_logs
   */
  export type users$audit_logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the audit_logs
     */
    select?: audit_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the audit_logs
     */
    omit?: audit_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: audit_logsInclude<ExtArgs> | null
    where?: audit_logsWhereInput
    orderBy?: audit_logsOrderByWithRelationInput | audit_logsOrderByWithRelationInput[]
    cursor?: audit_logsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Audit_logsScalarFieldEnum | Audit_logsScalarFieldEnum[]
  }

  /**
   * users.bases_bases_commander_idTousers
   */
  export type users$bases_bases_commander_idTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bases
     */
    select?: basesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bases
     */
    omit?: basesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: basesInclude<ExtArgs> | null
    where?: basesWhereInput
    orderBy?: basesOrderByWithRelationInput | basesOrderByWithRelationInput[]
    cursor?: basesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BasesScalarFieldEnum | BasesScalarFieldEnum[]
  }

  /**
   * users.expenditures_expenditures_authorized_byTousers
   */
  export type users$expenditures_expenditures_authorized_byTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the expenditures
     */
    select?: expendituresSelect<ExtArgs> | null
    /**
     * Omit specific fields from the expenditures
     */
    omit?: expendituresOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: expendituresInclude<ExtArgs> | null
    where?: expendituresWhereInput
    orderBy?: expendituresOrderByWithRelationInput | expendituresOrderByWithRelationInput[]
    cursor?: expendituresWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExpendituresScalarFieldEnum | ExpendituresScalarFieldEnum[]
  }

  /**
   * users.expenditures_expenditures_created_byTousers
   */
  export type users$expenditures_expenditures_created_byTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the expenditures
     */
    select?: expendituresSelect<ExtArgs> | null
    /**
     * Omit specific fields from the expenditures
     */
    omit?: expendituresOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: expendituresInclude<ExtArgs> | null
    where?: expendituresWhereInput
    orderBy?: expendituresOrderByWithRelationInput | expendituresOrderByWithRelationInput[]
    cursor?: expendituresWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExpendituresScalarFieldEnum | ExpendituresScalarFieldEnum[]
  }

  /**
   * users.purchases_purchases_approved_byTousers
   */
  export type users$purchases_purchases_approved_byTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the purchases
     */
    select?: purchasesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the purchases
     */
    omit?: purchasesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: purchasesInclude<ExtArgs> | null
    where?: purchasesWhereInput
    orderBy?: purchasesOrderByWithRelationInput | purchasesOrderByWithRelationInput[]
    cursor?: purchasesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PurchasesScalarFieldEnum | PurchasesScalarFieldEnum[]
  }

  /**
   * users.purchases_purchases_created_byTousers
   */
  export type users$purchases_purchases_created_byTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the purchases
     */
    select?: purchasesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the purchases
     */
    omit?: purchasesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: purchasesInclude<ExtArgs> | null
    where?: purchasesWhereInput
    orderBy?: purchasesOrderByWithRelationInput | purchasesOrderByWithRelationInput[]
    cursor?: purchasesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PurchasesScalarFieldEnum | PurchasesScalarFieldEnum[]
  }

  /**
   * users.transfers_transfers_approved_byTousers
   */
  export type users$transfers_transfers_approved_byTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transfers
     */
    select?: transfersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transfers
     */
    omit?: transfersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transfersInclude<ExtArgs> | null
    where?: transfersWhereInput
    orderBy?: transfersOrderByWithRelationInput | transfersOrderByWithRelationInput[]
    cursor?: transfersWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransfersScalarFieldEnum | TransfersScalarFieldEnum[]
  }

  /**
   * users.transfers_transfers_created_byTousers
   */
  export type users$transfers_transfers_created_byTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transfers
     */
    select?: transfersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transfers
     */
    omit?: transfersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transfersInclude<ExtArgs> | null
    where?: transfersWhereInput
    orderBy?: transfersOrderByWithRelationInput | transfersOrderByWithRelationInput[]
    cursor?: transfersWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransfersScalarFieldEnum | TransfersScalarFieldEnum[]
  }

  /**
   * users.bases_users_base_idTobases
   */
  export type users$bases_users_base_idTobasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bases
     */
    select?: basesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bases
     */
    omit?: basesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: basesInclude<ExtArgs> | null
    where?: basesWhereInput
  }

  /**
   * users without action
   */
  export type usersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AssetsScalarFieldEnum: {
    id: 'id',
    name: 'name',
    base_id: 'base_id',
    quantity: 'quantity',
    available_quantity: 'available_quantity',
    assigned_quantity: 'assigned_quantity',
    status: 'status',
    created_at: 'created_at'
  };

  export type AssetsScalarFieldEnum = (typeof AssetsScalarFieldEnum)[keyof typeof AssetsScalarFieldEnum]


  export const AssignmentsScalarFieldEnum: {
    id: 'id',
    asset_name: 'asset_name',
    assigned_to: 'assigned_to',
    assigned_by: 'assigned_by',
    base_id: 'base_id',
    quantity: 'quantity',
    expended_quantity: 'expended_quantity',
    assignment_date: 'assignment_date',
    status: 'status',
    notes: 'notes',
    created_at: 'created_at'
  };

  export type AssignmentsScalarFieldEnum = (typeof AssignmentsScalarFieldEnum)[keyof typeof AssignmentsScalarFieldEnum]


  export const Audit_logsScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    action: 'action',
    table_name: 'table_name',
    record_id: 'record_id',
    old_values: 'old_values',
    new_values: 'new_values',
    ip_address: 'ip_address',
    user_agent: 'user_agent',
    created_at: 'created_at'
  };

  export type Audit_logsScalarFieldEnum = (typeof Audit_logsScalarFieldEnum)[keyof typeof Audit_logsScalarFieldEnum]


  export const BasesScalarFieldEnum: {
    id: 'id',
    name: 'name',
    code: 'code',
    location: 'location',
    commander_id: 'commander_id',
    is_active: 'is_active',
    created_at: 'created_at'
  };

  export type BasesScalarFieldEnum = (typeof BasesScalarFieldEnum)[keyof typeof BasesScalarFieldEnum]


  export const ExpendituresScalarFieldEnum: {
    id: 'id',
    asset_name: 'asset_name',
    base_id: 'base_id',
    personnel_id: 'personnel_id',
    quantity: 'quantity',
    expenditure_date: 'expenditure_date',
    reason: 'reason',
    authorized_by: 'authorized_by',
    notes: 'notes',
    created_by: 'created_by',
    created_at: 'created_at'
  };

  export type ExpendituresScalarFieldEnum = (typeof ExpendituresScalarFieldEnum)[keyof typeof ExpendituresScalarFieldEnum]


  export const PersonnelScalarFieldEnum: {
    id: 'id',
    first_name: 'first_name',
    last_name: 'last_name',
    rank: 'rank',
    base_id: 'base_id',
    email: 'email',
    phone: 'phone',
    department: 'department',
    is_active: 'is_active',
    created_at: 'created_at'
  };

  export type PersonnelScalarFieldEnum = (typeof PersonnelScalarFieldEnum)[keyof typeof PersonnelScalarFieldEnum]


  export const PurchasesScalarFieldEnum: {
    id: 'id',
    asset_id: 'asset_id',
    base_id: 'base_id',
    quantity: 'quantity',
    supplier: 'supplier',
    purchase_date: 'purchase_date',
    status: 'status',
    approved_by: 'approved_by',
    approved_at: 'approved_at',
    notes: 'notes',
    created_by: 'created_by',
    created_at: 'created_at'
  };

  export type PurchasesScalarFieldEnum = (typeof PurchasesScalarFieldEnum)[keyof typeof PurchasesScalarFieldEnum]


  export const TransfersScalarFieldEnum: {
    id: 'id',
    transfer_number: 'transfer_number',
    from_base_id: 'from_base_id',
    to_base_id: 'to_base_id',
    asset_name: 'asset_name',
    quantity: 'quantity',
    transfer_date: 'transfer_date',
    status: 'status',
    approved_by: 'approved_by',
    approved_at: 'approved_at',
    notes: 'notes',
    created_by: 'created_by',
    created_at: 'created_at'
  };

  export type TransfersScalarFieldEnum = (typeof TransfersScalarFieldEnum)[keyof typeof TransfersScalarFieldEnum]


  export const UsersScalarFieldEnum: {
    id: 'id',
    username: 'username',
    email: 'email',
    password_hash: 'password_hash',
    first_name: 'first_name',
    last_name: 'last_name',
    role: 'role',
    base_id: 'base_id',
    is_active: 'is_active',
    created_at: 'created_at'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type assetsWhereInput = {
    AND?: assetsWhereInput | assetsWhereInput[]
    OR?: assetsWhereInput[]
    NOT?: assetsWhereInput | assetsWhereInput[]
    id?: UuidFilter<"assets"> | string
    name?: StringFilter<"assets"> | string
    base_id?: UuidFilter<"assets"> | string
    quantity?: IntFilter<"assets"> | number
    available_quantity?: IntFilter<"assets"> | number
    assigned_quantity?: IntFilter<"assets"> | number
    status?: StringFilter<"assets"> | string
    created_at?: DateTimeNullableFilter<"assets"> | Date | string | null
    bases?: XOR<BasesScalarRelationFilter, basesWhereInput>
    purchases?: PurchasesListRelationFilter
  }

  export type assetsOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    base_id?: SortOrder
    quantity?: SortOrder
    available_quantity?: SortOrder
    assigned_quantity?: SortOrder
    status?: SortOrder
    created_at?: SortOrderInput | SortOrder
    bases?: basesOrderByWithRelationInput
    purchases?: purchasesOrderByRelationAggregateInput
  }

  export type assetsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name_base_id?: assetsNameBase_idCompoundUniqueInput
    AND?: assetsWhereInput | assetsWhereInput[]
    OR?: assetsWhereInput[]
    NOT?: assetsWhereInput | assetsWhereInput[]
    name?: StringFilter<"assets"> | string
    base_id?: UuidFilter<"assets"> | string
    quantity?: IntFilter<"assets"> | number
    available_quantity?: IntFilter<"assets"> | number
    assigned_quantity?: IntFilter<"assets"> | number
    status?: StringFilter<"assets"> | string
    created_at?: DateTimeNullableFilter<"assets"> | Date | string | null
    bases?: XOR<BasesScalarRelationFilter, basesWhereInput>
    purchases?: PurchasesListRelationFilter
  }, "id" | "name_base_id">

  export type assetsOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    base_id?: SortOrder
    quantity?: SortOrder
    available_quantity?: SortOrder
    assigned_quantity?: SortOrder
    status?: SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: assetsCountOrderByAggregateInput
    _avg?: assetsAvgOrderByAggregateInput
    _max?: assetsMaxOrderByAggregateInput
    _min?: assetsMinOrderByAggregateInput
    _sum?: assetsSumOrderByAggregateInput
  }

  export type assetsScalarWhereWithAggregatesInput = {
    AND?: assetsScalarWhereWithAggregatesInput | assetsScalarWhereWithAggregatesInput[]
    OR?: assetsScalarWhereWithAggregatesInput[]
    NOT?: assetsScalarWhereWithAggregatesInput | assetsScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"assets"> | string
    name?: StringWithAggregatesFilter<"assets"> | string
    base_id?: UuidWithAggregatesFilter<"assets"> | string
    quantity?: IntWithAggregatesFilter<"assets"> | number
    available_quantity?: IntWithAggregatesFilter<"assets"> | number
    assigned_quantity?: IntWithAggregatesFilter<"assets"> | number
    status?: StringWithAggregatesFilter<"assets"> | string
    created_at?: DateTimeNullableWithAggregatesFilter<"assets"> | Date | string | null
  }

  export type assignmentsWhereInput = {
    AND?: assignmentsWhereInput | assignmentsWhereInput[]
    OR?: assignmentsWhereInput[]
    NOT?: assignmentsWhereInput | assignmentsWhereInput[]
    id?: UuidFilter<"assignments"> | string
    asset_name?: StringFilter<"assignments"> | string
    assigned_to?: UuidFilter<"assignments"> | string
    assigned_by?: UuidFilter<"assignments"> | string
    base_id?: UuidFilter<"assignments"> | string
    quantity?: IntFilter<"assignments"> | number
    expended_quantity?: IntFilter<"assignments"> | number
    assignment_date?: DateTimeFilter<"assignments"> | Date | string
    status?: StringFilter<"assignments"> | string
    notes?: StringNullableFilter<"assignments"> | string | null
    created_at?: DateTimeNullableFilter<"assignments"> | Date | string | null
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
    personnel?: XOR<PersonnelScalarRelationFilter, personnelWhereInput>
    bases?: XOR<BasesScalarRelationFilter, basesWhereInput>
  }

  export type assignmentsOrderByWithRelationInput = {
    id?: SortOrder
    asset_name?: SortOrder
    assigned_to?: SortOrder
    assigned_by?: SortOrder
    base_id?: SortOrder
    quantity?: SortOrder
    expended_quantity?: SortOrder
    assignment_date?: SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    users?: usersOrderByWithRelationInput
    personnel?: personnelOrderByWithRelationInput
    bases?: basesOrderByWithRelationInput
  }

  export type assignmentsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: assignmentsWhereInput | assignmentsWhereInput[]
    OR?: assignmentsWhereInput[]
    NOT?: assignmentsWhereInput | assignmentsWhereInput[]
    asset_name?: StringFilter<"assignments"> | string
    assigned_to?: UuidFilter<"assignments"> | string
    assigned_by?: UuidFilter<"assignments"> | string
    base_id?: UuidFilter<"assignments"> | string
    quantity?: IntFilter<"assignments"> | number
    expended_quantity?: IntFilter<"assignments"> | number
    assignment_date?: DateTimeFilter<"assignments"> | Date | string
    status?: StringFilter<"assignments"> | string
    notes?: StringNullableFilter<"assignments"> | string | null
    created_at?: DateTimeNullableFilter<"assignments"> | Date | string | null
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
    personnel?: XOR<PersonnelScalarRelationFilter, personnelWhereInput>
    bases?: XOR<BasesScalarRelationFilter, basesWhereInput>
  }, "id">

  export type assignmentsOrderByWithAggregationInput = {
    id?: SortOrder
    asset_name?: SortOrder
    assigned_to?: SortOrder
    assigned_by?: SortOrder
    base_id?: SortOrder
    quantity?: SortOrder
    expended_quantity?: SortOrder
    assignment_date?: SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: assignmentsCountOrderByAggregateInput
    _avg?: assignmentsAvgOrderByAggregateInput
    _max?: assignmentsMaxOrderByAggregateInput
    _min?: assignmentsMinOrderByAggregateInput
    _sum?: assignmentsSumOrderByAggregateInput
  }

  export type assignmentsScalarWhereWithAggregatesInput = {
    AND?: assignmentsScalarWhereWithAggregatesInput | assignmentsScalarWhereWithAggregatesInput[]
    OR?: assignmentsScalarWhereWithAggregatesInput[]
    NOT?: assignmentsScalarWhereWithAggregatesInput | assignmentsScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"assignments"> | string
    asset_name?: StringWithAggregatesFilter<"assignments"> | string
    assigned_to?: UuidWithAggregatesFilter<"assignments"> | string
    assigned_by?: UuidWithAggregatesFilter<"assignments"> | string
    base_id?: UuidWithAggregatesFilter<"assignments"> | string
    quantity?: IntWithAggregatesFilter<"assignments"> | number
    expended_quantity?: IntWithAggregatesFilter<"assignments"> | number
    assignment_date?: DateTimeWithAggregatesFilter<"assignments"> | Date | string
    status?: StringWithAggregatesFilter<"assignments"> | string
    notes?: StringNullableWithAggregatesFilter<"assignments"> | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"assignments"> | Date | string | null
  }

  export type audit_logsWhereInput = {
    AND?: audit_logsWhereInput | audit_logsWhereInput[]
    OR?: audit_logsWhereInput[]
    NOT?: audit_logsWhereInput | audit_logsWhereInput[]
    id?: UuidFilter<"audit_logs"> | string
    user_id?: UuidNullableFilter<"audit_logs"> | string | null
    action?: StringFilter<"audit_logs"> | string
    table_name?: StringFilter<"audit_logs"> | string
    record_id?: UuidNullableFilter<"audit_logs"> | string | null
    old_values?: JsonNullableFilter<"audit_logs">
    new_values?: JsonNullableFilter<"audit_logs">
    ip_address?: StringNullableFilter<"audit_logs"> | string | null
    user_agent?: StringNullableFilter<"audit_logs"> | string | null
    created_at?: DateTimeNullableFilter<"audit_logs"> | Date | string | null
    users?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
  }

  export type audit_logsOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrderInput | SortOrder
    action?: SortOrder
    table_name?: SortOrder
    record_id?: SortOrderInput | SortOrder
    old_values?: SortOrderInput | SortOrder
    new_values?: SortOrderInput | SortOrder
    ip_address?: SortOrderInput | SortOrder
    user_agent?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    users?: usersOrderByWithRelationInput
  }

  export type audit_logsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: audit_logsWhereInput | audit_logsWhereInput[]
    OR?: audit_logsWhereInput[]
    NOT?: audit_logsWhereInput | audit_logsWhereInput[]
    user_id?: UuidNullableFilter<"audit_logs"> | string | null
    action?: StringFilter<"audit_logs"> | string
    table_name?: StringFilter<"audit_logs"> | string
    record_id?: UuidNullableFilter<"audit_logs"> | string | null
    old_values?: JsonNullableFilter<"audit_logs">
    new_values?: JsonNullableFilter<"audit_logs">
    ip_address?: StringNullableFilter<"audit_logs"> | string | null
    user_agent?: StringNullableFilter<"audit_logs"> | string | null
    created_at?: DateTimeNullableFilter<"audit_logs"> | Date | string | null
    users?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
  }, "id">

  export type audit_logsOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrderInput | SortOrder
    action?: SortOrder
    table_name?: SortOrder
    record_id?: SortOrderInput | SortOrder
    old_values?: SortOrderInput | SortOrder
    new_values?: SortOrderInput | SortOrder
    ip_address?: SortOrderInput | SortOrder
    user_agent?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: audit_logsCountOrderByAggregateInput
    _max?: audit_logsMaxOrderByAggregateInput
    _min?: audit_logsMinOrderByAggregateInput
  }

  export type audit_logsScalarWhereWithAggregatesInput = {
    AND?: audit_logsScalarWhereWithAggregatesInput | audit_logsScalarWhereWithAggregatesInput[]
    OR?: audit_logsScalarWhereWithAggregatesInput[]
    NOT?: audit_logsScalarWhereWithAggregatesInput | audit_logsScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"audit_logs"> | string
    user_id?: UuidNullableWithAggregatesFilter<"audit_logs"> | string | null
    action?: StringWithAggregatesFilter<"audit_logs"> | string
    table_name?: StringWithAggregatesFilter<"audit_logs"> | string
    record_id?: UuidNullableWithAggregatesFilter<"audit_logs"> | string | null
    old_values?: JsonNullableWithAggregatesFilter<"audit_logs">
    new_values?: JsonNullableWithAggregatesFilter<"audit_logs">
    ip_address?: StringNullableWithAggregatesFilter<"audit_logs"> | string | null
    user_agent?: StringNullableWithAggregatesFilter<"audit_logs"> | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"audit_logs"> | Date | string | null
  }

  export type basesWhereInput = {
    AND?: basesWhereInput | basesWhereInput[]
    OR?: basesWhereInput[]
    NOT?: basesWhereInput | basesWhereInput[]
    id?: UuidFilter<"bases"> | string
    name?: StringFilter<"bases"> | string
    code?: StringFilter<"bases"> | string
    location?: StringFilter<"bases"> | string
    commander_id?: UuidNullableFilter<"bases"> | string | null
    is_active?: BoolNullableFilter<"bases"> | boolean | null
    created_at?: DateTimeNullableFilter<"bases"> | Date | string | null
    assets?: AssetsListRelationFilter
    assignments?: AssignmentsListRelationFilter
    users_bases_commander_idTousers?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
    expenditures?: ExpendituresListRelationFilter
    personnel?: PersonnelListRelationFilter
    purchases?: PurchasesListRelationFilter
    transfers_transfers_from_base_idTobases?: TransfersListRelationFilter
    transfers_transfers_to_base_idTobases?: TransfersListRelationFilter
    users_users_base_idTobases?: UsersListRelationFilter
  }

  export type basesOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    location?: SortOrder
    commander_id?: SortOrderInput | SortOrder
    is_active?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    assets?: assetsOrderByRelationAggregateInput
    assignments?: assignmentsOrderByRelationAggregateInput
    users_bases_commander_idTousers?: usersOrderByWithRelationInput
    expenditures?: expendituresOrderByRelationAggregateInput
    personnel?: personnelOrderByRelationAggregateInput
    purchases?: purchasesOrderByRelationAggregateInput
    transfers_transfers_from_base_idTobases?: transfersOrderByRelationAggregateInput
    transfers_transfers_to_base_idTobases?: transfersOrderByRelationAggregateInput
    users_users_base_idTobases?: usersOrderByRelationAggregateInput
  }

  export type basesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: basesWhereInput | basesWhereInput[]
    OR?: basesWhereInput[]
    NOT?: basesWhereInput | basesWhereInput[]
    name?: StringFilter<"bases"> | string
    location?: StringFilter<"bases"> | string
    commander_id?: UuidNullableFilter<"bases"> | string | null
    is_active?: BoolNullableFilter<"bases"> | boolean | null
    created_at?: DateTimeNullableFilter<"bases"> | Date | string | null
    assets?: AssetsListRelationFilter
    assignments?: AssignmentsListRelationFilter
    users_bases_commander_idTousers?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
    expenditures?: ExpendituresListRelationFilter
    personnel?: PersonnelListRelationFilter
    purchases?: PurchasesListRelationFilter
    transfers_transfers_from_base_idTobases?: TransfersListRelationFilter
    transfers_transfers_to_base_idTobases?: TransfersListRelationFilter
    users_users_base_idTobases?: UsersListRelationFilter
  }, "id" | "code">

  export type basesOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    location?: SortOrder
    commander_id?: SortOrderInput | SortOrder
    is_active?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: basesCountOrderByAggregateInput
    _max?: basesMaxOrderByAggregateInput
    _min?: basesMinOrderByAggregateInput
  }

  export type basesScalarWhereWithAggregatesInput = {
    AND?: basesScalarWhereWithAggregatesInput | basesScalarWhereWithAggregatesInput[]
    OR?: basesScalarWhereWithAggregatesInput[]
    NOT?: basesScalarWhereWithAggregatesInput | basesScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"bases"> | string
    name?: StringWithAggregatesFilter<"bases"> | string
    code?: StringWithAggregatesFilter<"bases"> | string
    location?: StringWithAggregatesFilter<"bases"> | string
    commander_id?: UuidNullableWithAggregatesFilter<"bases"> | string | null
    is_active?: BoolNullableWithAggregatesFilter<"bases"> | boolean | null
    created_at?: DateTimeNullableWithAggregatesFilter<"bases"> | Date | string | null
  }

  export type expendituresWhereInput = {
    AND?: expendituresWhereInput | expendituresWhereInput[]
    OR?: expendituresWhereInput[]
    NOT?: expendituresWhereInput | expendituresWhereInput[]
    id?: UuidFilter<"expenditures"> | string
    asset_name?: StringFilter<"expenditures"> | string
    base_id?: UuidFilter<"expenditures"> | string
    personnel_id?: UuidNullableFilter<"expenditures"> | string | null
    quantity?: IntFilter<"expenditures"> | number
    expenditure_date?: DateTimeFilter<"expenditures"> | Date | string
    reason?: StringFilter<"expenditures"> | string
    authorized_by?: UuidNullableFilter<"expenditures"> | string | null
    notes?: StringNullableFilter<"expenditures"> | string | null
    created_by?: UuidFilter<"expenditures"> | string
    created_at?: DateTimeNullableFilter<"expenditures"> | Date | string | null
    users_expenditures_authorized_byTousers?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
    bases?: XOR<BasesScalarRelationFilter, basesWhereInput>
    users_expenditures_created_byTousers?: XOR<UsersScalarRelationFilter, usersWhereInput>
    personnel?: XOR<PersonnelNullableScalarRelationFilter, personnelWhereInput> | null
  }

  export type expendituresOrderByWithRelationInput = {
    id?: SortOrder
    asset_name?: SortOrder
    base_id?: SortOrder
    personnel_id?: SortOrderInput | SortOrder
    quantity?: SortOrder
    expenditure_date?: SortOrder
    reason?: SortOrder
    authorized_by?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    created_by?: SortOrder
    created_at?: SortOrderInput | SortOrder
    users_expenditures_authorized_byTousers?: usersOrderByWithRelationInput
    bases?: basesOrderByWithRelationInput
    users_expenditures_created_byTousers?: usersOrderByWithRelationInput
    personnel?: personnelOrderByWithRelationInput
  }

  export type expendituresWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: expendituresWhereInput | expendituresWhereInput[]
    OR?: expendituresWhereInput[]
    NOT?: expendituresWhereInput | expendituresWhereInput[]
    asset_name?: StringFilter<"expenditures"> | string
    base_id?: UuidFilter<"expenditures"> | string
    personnel_id?: UuidNullableFilter<"expenditures"> | string | null
    quantity?: IntFilter<"expenditures"> | number
    expenditure_date?: DateTimeFilter<"expenditures"> | Date | string
    reason?: StringFilter<"expenditures"> | string
    authorized_by?: UuidNullableFilter<"expenditures"> | string | null
    notes?: StringNullableFilter<"expenditures"> | string | null
    created_by?: UuidFilter<"expenditures"> | string
    created_at?: DateTimeNullableFilter<"expenditures"> | Date | string | null
    users_expenditures_authorized_byTousers?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
    bases?: XOR<BasesScalarRelationFilter, basesWhereInput>
    users_expenditures_created_byTousers?: XOR<UsersScalarRelationFilter, usersWhereInput>
    personnel?: XOR<PersonnelNullableScalarRelationFilter, personnelWhereInput> | null
  }, "id">

  export type expendituresOrderByWithAggregationInput = {
    id?: SortOrder
    asset_name?: SortOrder
    base_id?: SortOrder
    personnel_id?: SortOrderInput | SortOrder
    quantity?: SortOrder
    expenditure_date?: SortOrder
    reason?: SortOrder
    authorized_by?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    created_by?: SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: expendituresCountOrderByAggregateInput
    _avg?: expendituresAvgOrderByAggregateInput
    _max?: expendituresMaxOrderByAggregateInput
    _min?: expendituresMinOrderByAggregateInput
    _sum?: expendituresSumOrderByAggregateInput
  }

  export type expendituresScalarWhereWithAggregatesInput = {
    AND?: expendituresScalarWhereWithAggregatesInput | expendituresScalarWhereWithAggregatesInput[]
    OR?: expendituresScalarWhereWithAggregatesInput[]
    NOT?: expendituresScalarWhereWithAggregatesInput | expendituresScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"expenditures"> | string
    asset_name?: StringWithAggregatesFilter<"expenditures"> | string
    base_id?: UuidWithAggregatesFilter<"expenditures"> | string
    personnel_id?: UuidNullableWithAggregatesFilter<"expenditures"> | string | null
    quantity?: IntWithAggregatesFilter<"expenditures"> | number
    expenditure_date?: DateTimeWithAggregatesFilter<"expenditures"> | Date | string
    reason?: StringWithAggregatesFilter<"expenditures"> | string
    authorized_by?: UuidNullableWithAggregatesFilter<"expenditures"> | string | null
    notes?: StringNullableWithAggregatesFilter<"expenditures"> | string | null
    created_by?: UuidWithAggregatesFilter<"expenditures"> | string
    created_at?: DateTimeNullableWithAggregatesFilter<"expenditures"> | Date | string | null
  }

  export type personnelWhereInput = {
    AND?: personnelWhereInput | personnelWhereInput[]
    OR?: personnelWhereInput[]
    NOT?: personnelWhereInput | personnelWhereInput[]
    id?: UuidFilter<"personnel"> | string
    first_name?: StringFilter<"personnel"> | string
    last_name?: StringFilter<"personnel"> | string
    rank?: StringFilter<"personnel"> | string
    base_id?: UuidFilter<"personnel"> | string
    email?: StringNullableFilter<"personnel"> | string | null
    phone?: StringNullableFilter<"personnel"> | string | null
    department?: StringNullableFilter<"personnel"> | string | null
    is_active?: BoolNullableFilter<"personnel"> | boolean | null
    created_at?: DateTimeNullableFilter<"personnel"> | Date | string | null
    assignments?: AssignmentsListRelationFilter
    expenditures?: ExpendituresListRelationFilter
    bases?: XOR<BasesScalarRelationFilter, basesWhereInput>
  }

  export type personnelOrderByWithRelationInput = {
    id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    rank?: SortOrder
    base_id?: SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    department?: SortOrderInput | SortOrder
    is_active?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    assignments?: assignmentsOrderByRelationAggregateInput
    expenditures?: expendituresOrderByRelationAggregateInput
    bases?: basesOrderByWithRelationInput
  }

  export type personnelWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    first_name_last_name_email?: personnelFirst_nameLast_nameEmailCompoundUniqueInput
    AND?: personnelWhereInput | personnelWhereInput[]
    OR?: personnelWhereInput[]
    NOT?: personnelWhereInput | personnelWhereInput[]
    first_name?: StringFilter<"personnel"> | string
    last_name?: StringFilter<"personnel"> | string
    rank?: StringFilter<"personnel"> | string
    base_id?: UuidFilter<"personnel"> | string
    email?: StringNullableFilter<"personnel"> | string | null
    phone?: StringNullableFilter<"personnel"> | string | null
    department?: StringNullableFilter<"personnel"> | string | null
    is_active?: BoolNullableFilter<"personnel"> | boolean | null
    created_at?: DateTimeNullableFilter<"personnel"> | Date | string | null
    assignments?: AssignmentsListRelationFilter
    expenditures?: ExpendituresListRelationFilter
    bases?: XOR<BasesScalarRelationFilter, basesWhereInput>
  }, "id" | "first_name_last_name_email">

  export type personnelOrderByWithAggregationInput = {
    id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    rank?: SortOrder
    base_id?: SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    department?: SortOrderInput | SortOrder
    is_active?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: personnelCountOrderByAggregateInput
    _max?: personnelMaxOrderByAggregateInput
    _min?: personnelMinOrderByAggregateInput
  }

  export type personnelScalarWhereWithAggregatesInput = {
    AND?: personnelScalarWhereWithAggregatesInput | personnelScalarWhereWithAggregatesInput[]
    OR?: personnelScalarWhereWithAggregatesInput[]
    NOT?: personnelScalarWhereWithAggregatesInput | personnelScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"personnel"> | string
    first_name?: StringWithAggregatesFilter<"personnel"> | string
    last_name?: StringWithAggregatesFilter<"personnel"> | string
    rank?: StringWithAggregatesFilter<"personnel"> | string
    base_id?: UuidWithAggregatesFilter<"personnel"> | string
    email?: StringNullableWithAggregatesFilter<"personnel"> | string | null
    phone?: StringNullableWithAggregatesFilter<"personnel"> | string | null
    department?: StringNullableWithAggregatesFilter<"personnel"> | string | null
    is_active?: BoolNullableWithAggregatesFilter<"personnel"> | boolean | null
    created_at?: DateTimeNullableWithAggregatesFilter<"personnel"> | Date | string | null
  }

  export type purchasesWhereInput = {
    AND?: purchasesWhereInput | purchasesWhereInput[]
    OR?: purchasesWhereInput[]
    NOT?: purchasesWhereInput | purchasesWhereInput[]
    id?: UuidFilter<"purchases"> | string
    asset_id?: UuidFilter<"purchases"> | string
    base_id?: UuidFilter<"purchases"> | string
    quantity?: IntFilter<"purchases"> | number
    supplier?: StringNullableFilter<"purchases"> | string | null
    purchase_date?: DateTimeFilter<"purchases"> | Date | string
    status?: StringFilter<"purchases"> | string
    approved_by?: UuidNullableFilter<"purchases"> | string | null
    approved_at?: DateTimeNullableFilter<"purchases"> | Date | string | null
    notes?: StringNullableFilter<"purchases"> | string | null
    created_by?: UuidFilter<"purchases"> | string
    created_at?: DateTimeNullableFilter<"purchases"> | Date | string | null
    users_purchases_approved_byTousers?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
    assets?: XOR<AssetsScalarRelationFilter, assetsWhereInput>
    bases?: XOR<BasesScalarRelationFilter, basesWhereInput>
    users_purchases_created_byTousers?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type purchasesOrderByWithRelationInput = {
    id?: SortOrder
    asset_id?: SortOrder
    base_id?: SortOrder
    quantity?: SortOrder
    supplier?: SortOrderInput | SortOrder
    purchase_date?: SortOrder
    status?: SortOrder
    approved_by?: SortOrderInput | SortOrder
    approved_at?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    created_by?: SortOrder
    created_at?: SortOrderInput | SortOrder
    users_purchases_approved_byTousers?: usersOrderByWithRelationInput
    assets?: assetsOrderByWithRelationInput
    bases?: basesOrderByWithRelationInput
    users_purchases_created_byTousers?: usersOrderByWithRelationInput
  }

  export type purchasesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: purchasesWhereInput | purchasesWhereInput[]
    OR?: purchasesWhereInput[]
    NOT?: purchasesWhereInput | purchasesWhereInput[]
    asset_id?: UuidFilter<"purchases"> | string
    base_id?: UuidFilter<"purchases"> | string
    quantity?: IntFilter<"purchases"> | number
    supplier?: StringNullableFilter<"purchases"> | string | null
    purchase_date?: DateTimeFilter<"purchases"> | Date | string
    status?: StringFilter<"purchases"> | string
    approved_by?: UuidNullableFilter<"purchases"> | string | null
    approved_at?: DateTimeNullableFilter<"purchases"> | Date | string | null
    notes?: StringNullableFilter<"purchases"> | string | null
    created_by?: UuidFilter<"purchases"> | string
    created_at?: DateTimeNullableFilter<"purchases"> | Date | string | null
    users_purchases_approved_byTousers?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
    assets?: XOR<AssetsScalarRelationFilter, assetsWhereInput>
    bases?: XOR<BasesScalarRelationFilter, basesWhereInput>
    users_purchases_created_byTousers?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "id">

  export type purchasesOrderByWithAggregationInput = {
    id?: SortOrder
    asset_id?: SortOrder
    base_id?: SortOrder
    quantity?: SortOrder
    supplier?: SortOrderInput | SortOrder
    purchase_date?: SortOrder
    status?: SortOrder
    approved_by?: SortOrderInput | SortOrder
    approved_at?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    created_by?: SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: purchasesCountOrderByAggregateInput
    _avg?: purchasesAvgOrderByAggregateInput
    _max?: purchasesMaxOrderByAggregateInput
    _min?: purchasesMinOrderByAggregateInput
    _sum?: purchasesSumOrderByAggregateInput
  }

  export type purchasesScalarWhereWithAggregatesInput = {
    AND?: purchasesScalarWhereWithAggregatesInput | purchasesScalarWhereWithAggregatesInput[]
    OR?: purchasesScalarWhereWithAggregatesInput[]
    NOT?: purchasesScalarWhereWithAggregatesInput | purchasesScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"purchases"> | string
    asset_id?: UuidWithAggregatesFilter<"purchases"> | string
    base_id?: UuidWithAggregatesFilter<"purchases"> | string
    quantity?: IntWithAggregatesFilter<"purchases"> | number
    supplier?: StringNullableWithAggregatesFilter<"purchases"> | string | null
    purchase_date?: DateTimeWithAggregatesFilter<"purchases"> | Date | string
    status?: StringWithAggregatesFilter<"purchases"> | string
    approved_by?: UuidNullableWithAggregatesFilter<"purchases"> | string | null
    approved_at?: DateTimeNullableWithAggregatesFilter<"purchases"> | Date | string | null
    notes?: StringNullableWithAggregatesFilter<"purchases"> | string | null
    created_by?: UuidWithAggregatesFilter<"purchases"> | string
    created_at?: DateTimeNullableWithAggregatesFilter<"purchases"> | Date | string | null
  }

  export type transfersWhereInput = {
    AND?: transfersWhereInput | transfersWhereInput[]
    OR?: transfersWhereInput[]
    NOT?: transfersWhereInput | transfersWhereInput[]
    id?: UuidFilter<"transfers"> | string
    transfer_number?: StringFilter<"transfers"> | string
    from_base_id?: UuidFilter<"transfers"> | string
    to_base_id?: UuidFilter<"transfers"> | string
    asset_name?: StringFilter<"transfers"> | string
    quantity?: IntFilter<"transfers"> | number
    transfer_date?: DateTimeFilter<"transfers"> | Date | string
    status?: StringFilter<"transfers"> | string
    approved_by?: UuidNullableFilter<"transfers"> | string | null
    approved_at?: DateTimeNullableFilter<"transfers"> | Date | string | null
    notes?: StringNullableFilter<"transfers"> | string | null
    created_by?: UuidFilter<"transfers"> | string
    created_at?: DateTimeNullableFilter<"transfers"> | Date | string | null
    users_transfers_approved_byTousers?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
    users_transfers_created_byTousers?: XOR<UsersScalarRelationFilter, usersWhereInput>
    bases_transfers_from_base_idTobases?: XOR<BasesScalarRelationFilter, basesWhereInput>
    bases_transfers_to_base_idTobases?: XOR<BasesScalarRelationFilter, basesWhereInput>
  }

  export type transfersOrderByWithRelationInput = {
    id?: SortOrder
    transfer_number?: SortOrder
    from_base_id?: SortOrder
    to_base_id?: SortOrder
    asset_name?: SortOrder
    quantity?: SortOrder
    transfer_date?: SortOrder
    status?: SortOrder
    approved_by?: SortOrderInput | SortOrder
    approved_at?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    created_by?: SortOrder
    created_at?: SortOrderInput | SortOrder
    users_transfers_approved_byTousers?: usersOrderByWithRelationInput
    users_transfers_created_byTousers?: usersOrderByWithRelationInput
    bases_transfers_from_base_idTobases?: basesOrderByWithRelationInput
    bases_transfers_to_base_idTobases?: basesOrderByWithRelationInput
  }

  export type transfersWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    transfer_number?: string
    AND?: transfersWhereInput | transfersWhereInput[]
    OR?: transfersWhereInput[]
    NOT?: transfersWhereInput | transfersWhereInput[]
    from_base_id?: UuidFilter<"transfers"> | string
    to_base_id?: UuidFilter<"transfers"> | string
    asset_name?: StringFilter<"transfers"> | string
    quantity?: IntFilter<"transfers"> | number
    transfer_date?: DateTimeFilter<"transfers"> | Date | string
    status?: StringFilter<"transfers"> | string
    approved_by?: UuidNullableFilter<"transfers"> | string | null
    approved_at?: DateTimeNullableFilter<"transfers"> | Date | string | null
    notes?: StringNullableFilter<"transfers"> | string | null
    created_by?: UuidFilter<"transfers"> | string
    created_at?: DateTimeNullableFilter<"transfers"> | Date | string | null
    users_transfers_approved_byTousers?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
    users_transfers_created_byTousers?: XOR<UsersScalarRelationFilter, usersWhereInput>
    bases_transfers_from_base_idTobases?: XOR<BasesScalarRelationFilter, basesWhereInput>
    bases_transfers_to_base_idTobases?: XOR<BasesScalarRelationFilter, basesWhereInput>
  }, "id" | "transfer_number">

  export type transfersOrderByWithAggregationInput = {
    id?: SortOrder
    transfer_number?: SortOrder
    from_base_id?: SortOrder
    to_base_id?: SortOrder
    asset_name?: SortOrder
    quantity?: SortOrder
    transfer_date?: SortOrder
    status?: SortOrder
    approved_by?: SortOrderInput | SortOrder
    approved_at?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    created_by?: SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: transfersCountOrderByAggregateInput
    _avg?: transfersAvgOrderByAggregateInput
    _max?: transfersMaxOrderByAggregateInput
    _min?: transfersMinOrderByAggregateInput
    _sum?: transfersSumOrderByAggregateInput
  }

  export type transfersScalarWhereWithAggregatesInput = {
    AND?: transfersScalarWhereWithAggregatesInput | transfersScalarWhereWithAggregatesInput[]
    OR?: transfersScalarWhereWithAggregatesInput[]
    NOT?: transfersScalarWhereWithAggregatesInput | transfersScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"transfers"> | string
    transfer_number?: StringWithAggregatesFilter<"transfers"> | string
    from_base_id?: UuidWithAggregatesFilter<"transfers"> | string
    to_base_id?: UuidWithAggregatesFilter<"transfers"> | string
    asset_name?: StringWithAggregatesFilter<"transfers"> | string
    quantity?: IntWithAggregatesFilter<"transfers"> | number
    transfer_date?: DateTimeWithAggregatesFilter<"transfers"> | Date | string
    status?: StringWithAggregatesFilter<"transfers"> | string
    approved_by?: UuidNullableWithAggregatesFilter<"transfers"> | string | null
    approved_at?: DateTimeNullableWithAggregatesFilter<"transfers"> | Date | string | null
    notes?: StringNullableWithAggregatesFilter<"transfers"> | string | null
    created_by?: UuidWithAggregatesFilter<"transfers"> | string
    created_at?: DateTimeNullableWithAggregatesFilter<"transfers"> | Date | string | null
  }

  export type usersWhereInput = {
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    id?: UuidFilter<"users"> | string
    username?: StringFilter<"users"> | string
    email?: StringFilter<"users"> | string
    password_hash?: StringFilter<"users"> | string
    first_name?: StringFilter<"users"> | string
    last_name?: StringFilter<"users"> | string
    role?: StringFilter<"users"> | string
    base_id?: UuidNullableFilter<"users"> | string | null
    is_active?: BoolNullableFilter<"users"> | boolean | null
    created_at?: DateTimeNullableFilter<"users"> | Date | string | null
    assignments?: AssignmentsListRelationFilter
    audit_logs?: Audit_logsListRelationFilter
    bases_bases_commander_idTousers?: BasesListRelationFilter
    expenditures_expenditures_authorized_byTousers?: ExpendituresListRelationFilter
    expenditures_expenditures_created_byTousers?: ExpendituresListRelationFilter
    purchases_purchases_approved_byTousers?: PurchasesListRelationFilter
    purchases_purchases_created_byTousers?: PurchasesListRelationFilter
    transfers_transfers_approved_byTousers?: TransfersListRelationFilter
    transfers_transfers_created_byTousers?: TransfersListRelationFilter
    bases_users_base_idTobases?: XOR<BasesNullableScalarRelationFilter, basesWhereInput> | null
  }

  export type usersOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    role?: SortOrder
    base_id?: SortOrderInput | SortOrder
    is_active?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    assignments?: assignmentsOrderByRelationAggregateInput
    audit_logs?: audit_logsOrderByRelationAggregateInput
    bases_bases_commander_idTousers?: basesOrderByRelationAggregateInput
    expenditures_expenditures_authorized_byTousers?: expendituresOrderByRelationAggregateInput
    expenditures_expenditures_created_byTousers?: expendituresOrderByRelationAggregateInput
    purchases_purchases_approved_byTousers?: purchasesOrderByRelationAggregateInput
    purchases_purchases_created_byTousers?: purchasesOrderByRelationAggregateInput
    transfers_transfers_approved_byTousers?: transfersOrderByRelationAggregateInput
    transfers_transfers_created_byTousers?: transfersOrderByRelationAggregateInput
    bases_users_base_idTobases?: basesOrderByWithRelationInput
  }

  export type usersWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    email?: string
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    password_hash?: StringFilter<"users"> | string
    first_name?: StringFilter<"users"> | string
    last_name?: StringFilter<"users"> | string
    role?: StringFilter<"users"> | string
    base_id?: UuidNullableFilter<"users"> | string | null
    is_active?: BoolNullableFilter<"users"> | boolean | null
    created_at?: DateTimeNullableFilter<"users"> | Date | string | null
    assignments?: AssignmentsListRelationFilter
    audit_logs?: Audit_logsListRelationFilter
    bases_bases_commander_idTousers?: BasesListRelationFilter
    expenditures_expenditures_authorized_byTousers?: ExpendituresListRelationFilter
    expenditures_expenditures_created_byTousers?: ExpendituresListRelationFilter
    purchases_purchases_approved_byTousers?: PurchasesListRelationFilter
    purchases_purchases_created_byTousers?: PurchasesListRelationFilter
    transfers_transfers_approved_byTousers?: TransfersListRelationFilter
    transfers_transfers_created_byTousers?: TransfersListRelationFilter
    bases_users_base_idTobases?: XOR<BasesNullableScalarRelationFilter, basesWhereInput> | null
  }, "id" | "username" | "email">

  export type usersOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    role?: SortOrder
    base_id?: SortOrderInput | SortOrder
    is_active?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: usersCountOrderByAggregateInput
    _max?: usersMaxOrderByAggregateInput
    _min?: usersMinOrderByAggregateInput
  }

  export type usersScalarWhereWithAggregatesInput = {
    AND?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    OR?: usersScalarWhereWithAggregatesInput[]
    NOT?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"users"> | string
    username?: StringWithAggregatesFilter<"users"> | string
    email?: StringWithAggregatesFilter<"users"> | string
    password_hash?: StringWithAggregatesFilter<"users"> | string
    first_name?: StringWithAggregatesFilter<"users"> | string
    last_name?: StringWithAggregatesFilter<"users"> | string
    role?: StringWithAggregatesFilter<"users"> | string
    base_id?: UuidNullableWithAggregatesFilter<"users"> | string | null
    is_active?: BoolNullableWithAggregatesFilter<"users"> | boolean | null
    created_at?: DateTimeNullableWithAggregatesFilter<"users"> | Date | string | null
  }

  export type assetsCreateInput = {
    id?: string
    name: string
    quantity?: number
    available_quantity?: number
    assigned_quantity?: number
    status?: string
    created_at?: Date | string | null
    bases: basesCreateNestedOneWithoutAssetsInput
    purchases?: purchasesCreateNestedManyWithoutAssetsInput
  }

  export type assetsUncheckedCreateInput = {
    id?: string
    name: string
    base_id: string
    quantity?: number
    available_quantity?: number
    assigned_quantity?: number
    status?: string
    created_at?: Date | string | null
    purchases?: purchasesUncheckedCreateNestedManyWithoutAssetsInput
  }

  export type assetsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    available_quantity?: IntFieldUpdateOperationsInput | number
    assigned_quantity?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bases?: basesUpdateOneRequiredWithoutAssetsNestedInput
    purchases?: purchasesUpdateManyWithoutAssetsNestedInput
  }

  export type assetsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    base_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    available_quantity?: IntFieldUpdateOperationsInput | number
    assigned_quantity?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    purchases?: purchasesUncheckedUpdateManyWithoutAssetsNestedInput
  }

  export type assetsCreateManyInput = {
    id?: string
    name: string
    base_id: string
    quantity?: number
    available_quantity?: number
    assigned_quantity?: number
    status?: string
    created_at?: Date | string | null
  }

  export type assetsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    available_quantity?: IntFieldUpdateOperationsInput | number
    assigned_quantity?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type assetsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    base_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    available_quantity?: IntFieldUpdateOperationsInput | number
    assigned_quantity?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type assignmentsCreateInput = {
    id?: string
    asset_name: string
    quantity?: number
    expended_quantity?: number
    assignment_date: Date | string
    status?: string
    notes?: string | null
    created_at?: Date | string | null
    users: usersCreateNestedOneWithoutAssignmentsInput
    personnel: personnelCreateNestedOneWithoutAssignmentsInput
    bases: basesCreateNestedOneWithoutAssignmentsInput
  }

  export type assignmentsUncheckedCreateInput = {
    id?: string
    asset_name: string
    assigned_to: string
    assigned_by: string
    base_id: string
    quantity?: number
    expended_quantity?: number
    assignment_date: Date | string
    status?: string
    notes?: string | null
    created_at?: Date | string | null
  }

  export type assignmentsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    asset_name?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    expended_quantity?: IntFieldUpdateOperationsInput | number
    assignment_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: usersUpdateOneRequiredWithoutAssignmentsNestedInput
    personnel?: personnelUpdateOneRequiredWithoutAssignmentsNestedInput
    bases?: basesUpdateOneRequiredWithoutAssignmentsNestedInput
  }

  export type assignmentsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    asset_name?: StringFieldUpdateOperationsInput | string
    assigned_to?: StringFieldUpdateOperationsInput | string
    assigned_by?: StringFieldUpdateOperationsInput | string
    base_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    expended_quantity?: IntFieldUpdateOperationsInput | number
    assignment_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type assignmentsCreateManyInput = {
    id?: string
    asset_name: string
    assigned_to: string
    assigned_by: string
    base_id: string
    quantity?: number
    expended_quantity?: number
    assignment_date: Date | string
    status?: string
    notes?: string | null
    created_at?: Date | string | null
  }

  export type assignmentsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    asset_name?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    expended_quantity?: IntFieldUpdateOperationsInput | number
    assignment_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type assignmentsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    asset_name?: StringFieldUpdateOperationsInput | string
    assigned_to?: StringFieldUpdateOperationsInput | string
    assigned_by?: StringFieldUpdateOperationsInput | string
    base_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    expended_quantity?: IntFieldUpdateOperationsInput | number
    assignment_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type audit_logsCreateInput = {
    id?: string
    action: string
    table_name: string
    record_id?: string | null
    old_values?: NullableJsonNullValueInput | InputJsonValue
    new_values?: NullableJsonNullValueInput | InputJsonValue
    ip_address?: string | null
    user_agent?: string | null
    created_at?: Date | string | null
    users?: usersCreateNestedOneWithoutAudit_logsInput
  }

  export type audit_logsUncheckedCreateInput = {
    id?: string
    user_id?: string | null
    action: string
    table_name: string
    record_id?: string | null
    old_values?: NullableJsonNullValueInput | InputJsonValue
    new_values?: NullableJsonNullValueInput | InputJsonValue
    ip_address?: string | null
    user_agent?: string | null
    created_at?: Date | string | null
  }

  export type audit_logsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    table_name?: StringFieldUpdateOperationsInput | string
    record_id?: NullableStringFieldUpdateOperationsInput | string | null
    old_values?: NullableJsonNullValueInput | InputJsonValue
    new_values?: NullableJsonNullValueInput | InputJsonValue
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: usersUpdateOneWithoutAudit_logsNestedInput
  }

  export type audit_logsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    table_name?: StringFieldUpdateOperationsInput | string
    record_id?: NullableStringFieldUpdateOperationsInput | string | null
    old_values?: NullableJsonNullValueInput | InputJsonValue
    new_values?: NullableJsonNullValueInput | InputJsonValue
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type audit_logsCreateManyInput = {
    id?: string
    user_id?: string | null
    action: string
    table_name: string
    record_id?: string | null
    old_values?: NullableJsonNullValueInput | InputJsonValue
    new_values?: NullableJsonNullValueInput | InputJsonValue
    ip_address?: string | null
    user_agent?: string | null
    created_at?: Date | string | null
  }

  export type audit_logsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    table_name?: StringFieldUpdateOperationsInput | string
    record_id?: NullableStringFieldUpdateOperationsInput | string | null
    old_values?: NullableJsonNullValueInput | InputJsonValue
    new_values?: NullableJsonNullValueInput | InputJsonValue
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type audit_logsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    table_name?: StringFieldUpdateOperationsInput | string
    record_id?: NullableStringFieldUpdateOperationsInput | string | null
    old_values?: NullableJsonNullValueInput | InputJsonValue
    new_values?: NullableJsonNullValueInput | InputJsonValue
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type basesCreateInput = {
    id?: string
    name: string
    code: string
    location: string
    is_active?: boolean | null
    created_at?: Date | string | null
    assets?: assetsCreateNestedManyWithoutBasesInput
    assignments?: assignmentsCreateNestedManyWithoutBasesInput
    users_bases_commander_idTousers?: usersCreateNestedOneWithoutBases_bases_commander_idTousersInput
    expenditures?: expendituresCreateNestedManyWithoutBasesInput
    personnel?: personnelCreateNestedManyWithoutBasesInput
    purchases?: purchasesCreateNestedManyWithoutBasesInput
    transfers_transfers_from_base_idTobases?: transfersCreateNestedManyWithoutBases_transfers_from_base_idTobasesInput
    transfers_transfers_to_base_idTobases?: transfersCreateNestedManyWithoutBases_transfers_to_base_idTobasesInput
    users_users_base_idTobases?: usersCreateNestedManyWithoutBases_users_base_idTobasesInput
  }

  export type basesUncheckedCreateInput = {
    id?: string
    name: string
    code: string
    location: string
    commander_id?: string | null
    is_active?: boolean | null
    created_at?: Date | string | null
    assets?: assetsUncheckedCreateNestedManyWithoutBasesInput
    assignments?: assignmentsUncheckedCreateNestedManyWithoutBasesInput
    expenditures?: expendituresUncheckedCreateNestedManyWithoutBasesInput
    personnel?: personnelUncheckedCreateNestedManyWithoutBasesInput
    purchases?: purchasesUncheckedCreateNestedManyWithoutBasesInput
    transfers_transfers_from_base_idTobases?: transfersUncheckedCreateNestedManyWithoutBases_transfers_from_base_idTobasesInput
    transfers_transfers_to_base_idTobases?: transfersUncheckedCreateNestedManyWithoutBases_transfers_to_base_idTobasesInput
    users_users_base_idTobases?: usersUncheckedCreateNestedManyWithoutBases_users_base_idTobasesInput
  }

  export type basesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assets?: assetsUpdateManyWithoutBasesNestedInput
    assignments?: assignmentsUpdateManyWithoutBasesNestedInput
    users_bases_commander_idTousers?: usersUpdateOneWithoutBases_bases_commander_idTousersNestedInput
    expenditures?: expendituresUpdateManyWithoutBasesNestedInput
    personnel?: personnelUpdateManyWithoutBasesNestedInput
    purchases?: purchasesUpdateManyWithoutBasesNestedInput
    transfers_transfers_from_base_idTobases?: transfersUpdateManyWithoutBases_transfers_from_base_idTobasesNestedInput
    transfers_transfers_to_base_idTobases?: transfersUpdateManyWithoutBases_transfers_to_base_idTobasesNestedInput
    users_users_base_idTobases?: usersUpdateManyWithoutBases_users_base_idTobasesNestedInput
  }

  export type basesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    commander_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assets?: assetsUncheckedUpdateManyWithoutBasesNestedInput
    assignments?: assignmentsUncheckedUpdateManyWithoutBasesNestedInput
    expenditures?: expendituresUncheckedUpdateManyWithoutBasesNestedInput
    personnel?: personnelUncheckedUpdateManyWithoutBasesNestedInput
    purchases?: purchasesUncheckedUpdateManyWithoutBasesNestedInput
    transfers_transfers_from_base_idTobases?: transfersUncheckedUpdateManyWithoutBases_transfers_from_base_idTobasesNestedInput
    transfers_transfers_to_base_idTobases?: transfersUncheckedUpdateManyWithoutBases_transfers_to_base_idTobasesNestedInput
    users_users_base_idTobases?: usersUncheckedUpdateManyWithoutBases_users_base_idTobasesNestedInput
  }

  export type basesCreateManyInput = {
    id?: string
    name: string
    code: string
    location: string
    commander_id?: string | null
    is_active?: boolean | null
    created_at?: Date | string | null
  }

  export type basesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type basesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    commander_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type expendituresCreateInput = {
    id?: string
    asset_name: string
    quantity: number
    expenditure_date: Date | string
    reason: string
    notes?: string | null
    created_at?: Date | string | null
    users_expenditures_authorized_byTousers?: usersCreateNestedOneWithoutExpenditures_expenditures_authorized_byTousersInput
    bases: basesCreateNestedOneWithoutExpendituresInput
    users_expenditures_created_byTousers: usersCreateNestedOneWithoutExpenditures_expenditures_created_byTousersInput
    personnel?: personnelCreateNestedOneWithoutExpendituresInput
  }

  export type expendituresUncheckedCreateInput = {
    id?: string
    asset_name: string
    base_id: string
    personnel_id?: string | null
    quantity: number
    expenditure_date: Date | string
    reason: string
    authorized_by?: string | null
    notes?: string | null
    created_by: string
    created_at?: Date | string | null
  }

  export type expendituresUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    asset_name?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    expenditure_date?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users_expenditures_authorized_byTousers?: usersUpdateOneWithoutExpenditures_expenditures_authorized_byTousersNestedInput
    bases?: basesUpdateOneRequiredWithoutExpendituresNestedInput
    users_expenditures_created_byTousers?: usersUpdateOneRequiredWithoutExpenditures_expenditures_created_byTousersNestedInput
    personnel?: personnelUpdateOneWithoutExpendituresNestedInput
  }

  export type expendituresUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    asset_name?: StringFieldUpdateOperationsInput | string
    base_id?: StringFieldUpdateOperationsInput | string
    personnel_id?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    expenditure_date?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: StringFieldUpdateOperationsInput | string
    authorized_by?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type expendituresCreateManyInput = {
    id?: string
    asset_name: string
    base_id: string
    personnel_id?: string | null
    quantity: number
    expenditure_date: Date | string
    reason: string
    authorized_by?: string | null
    notes?: string | null
    created_by: string
    created_at?: Date | string | null
  }

  export type expendituresUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    asset_name?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    expenditure_date?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type expendituresUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    asset_name?: StringFieldUpdateOperationsInput | string
    base_id?: StringFieldUpdateOperationsInput | string
    personnel_id?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    expenditure_date?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: StringFieldUpdateOperationsInput | string
    authorized_by?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type personnelCreateInput = {
    id?: string
    first_name: string
    last_name: string
    rank: string
    email?: string | null
    phone?: string | null
    department?: string | null
    is_active?: boolean | null
    created_at?: Date | string | null
    assignments?: assignmentsCreateNestedManyWithoutPersonnelInput
    expenditures?: expendituresCreateNestedManyWithoutPersonnelInput
    bases: basesCreateNestedOneWithoutPersonnelInput
  }

  export type personnelUncheckedCreateInput = {
    id?: string
    first_name: string
    last_name: string
    rank: string
    base_id: string
    email?: string | null
    phone?: string | null
    department?: string | null
    is_active?: boolean | null
    created_at?: Date | string | null
    assignments?: assignmentsUncheckedCreateNestedManyWithoutPersonnelInput
    expenditures?: expendituresUncheckedCreateNestedManyWithoutPersonnelInput
  }

  export type personnelUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    rank?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignments?: assignmentsUpdateManyWithoutPersonnelNestedInput
    expenditures?: expendituresUpdateManyWithoutPersonnelNestedInput
    bases?: basesUpdateOneRequiredWithoutPersonnelNestedInput
  }

  export type personnelUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    rank?: StringFieldUpdateOperationsInput | string
    base_id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignments?: assignmentsUncheckedUpdateManyWithoutPersonnelNestedInput
    expenditures?: expendituresUncheckedUpdateManyWithoutPersonnelNestedInput
  }

  export type personnelCreateManyInput = {
    id?: string
    first_name: string
    last_name: string
    rank: string
    base_id: string
    email?: string | null
    phone?: string | null
    department?: string | null
    is_active?: boolean | null
    created_at?: Date | string | null
  }

  export type personnelUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    rank?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type personnelUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    rank?: StringFieldUpdateOperationsInput | string
    base_id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type purchasesCreateInput = {
    id?: string
    quantity: number
    supplier?: string | null
    purchase_date: Date | string
    status?: string
    approved_at?: Date | string | null
    notes?: string | null
    created_at?: Date | string | null
    users_purchases_approved_byTousers?: usersCreateNestedOneWithoutPurchases_purchases_approved_byTousersInput
    assets: assetsCreateNestedOneWithoutPurchasesInput
    bases: basesCreateNestedOneWithoutPurchasesInput
    users_purchases_created_byTousers: usersCreateNestedOneWithoutPurchases_purchases_created_byTousersInput
  }

  export type purchasesUncheckedCreateInput = {
    id?: string
    asset_id: string
    base_id: string
    quantity: number
    supplier?: string | null
    purchase_date: Date | string
    status?: string
    approved_by?: string | null
    approved_at?: Date | string | null
    notes?: string | null
    created_by: string
    created_at?: Date | string | null
  }

  export type purchasesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    purchase_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users_purchases_approved_byTousers?: usersUpdateOneWithoutPurchases_purchases_approved_byTousersNestedInput
    assets?: assetsUpdateOneRequiredWithoutPurchasesNestedInput
    bases?: basesUpdateOneRequiredWithoutPurchasesNestedInput
    users_purchases_created_byTousers?: usersUpdateOneRequiredWithoutPurchases_purchases_created_byTousersNestedInput
  }

  export type purchasesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    asset_id?: StringFieldUpdateOperationsInput | string
    base_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    purchase_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type purchasesCreateManyInput = {
    id?: string
    asset_id: string
    base_id: string
    quantity: number
    supplier?: string | null
    purchase_date: Date | string
    status?: string
    approved_by?: string | null
    approved_at?: Date | string | null
    notes?: string | null
    created_by: string
    created_at?: Date | string | null
  }

  export type purchasesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    purchase_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type purchasesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    asset_id?: StringFieldUpdateOperationsInput | string
    base_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    purchase_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type transfersCreateInput = {
    id?: string
    transfer_number: string
    asset_name: string
    quantity: number
    transfer_date: Date | string
    status?: string
    approved_at?: Date | string | null
    notes?: string | null
    created_at?: Date | string | null
    users_transfers_approved_byTousers?: usersCreateNestedOneWithoutTransfers_transfers_approved_byTousersInput
    users_transfers_created_byTousers: usersCreateNestedOneWithoutTransfers_transfers_created_byTousersInput
    bases_transfers_from_base_idTobases: basesCreateNestedOneWithoutTransfers_transfers_from_base_idTobasesInput
    bases_transfers_to_base_idTobases: basesCreateNestedOneWithoutTransfers_transfers_to_base_idTobasesInput
  }

  export type transfersUncheckedCreateInput = {
    id?: string
    transfer_number: string
    from_base_id: string
    to_base_id: string
    asset_name: string
    quantity: number
    transfer_date: Date | string
    status?: string
    approved_by?: string | null
    approved_at?: Date | string | null
    notes?: string | null
    created_by: string
    created_at?: Date | string | null
  }

  export type transfersUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    transfer_number?: StringFieldUpdateOperationsInput | string
    asset_name?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    transfer_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users_transfers_approved_byTousers?: usersUpdateOneWithoutTransfers_transfers_approved_byTousersNestedInput
    users_transfers_created_byTousers?: usersUpdateOneRequiredWithoutTransfers_transfers_created_byTousersNestedInput
    bases_transfers_from_base_idTobases?: basesUpdateOneRequiredWithoutTransfers_transfers_from_base_idTobasesNestedInput
    bases_transfers_to_base_idTobases?: basesUpdateOneRequiredWithoutTransfers_transfers_to_base_idTobasesNestedInput
  }

  export type transfersUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    transfer_number?: StringFieldUpdateOperationsInput | string
    from_base_id?: StringFieldUpdateOperationsInput | string
    to_base_id?: StringFieldUpdateOperationsInput | string
    asset_name?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    transfer_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type transfersCreateManyInput = {
    id?: string
    transfer_number: string
    from_base_id: string
    to_base_id: string
    asset_name: string
    quantity: number
    transfer_date: Date | string
    status?: string
    approved_by?: string | null
    approved_at?: Date | string | null
    notes?: string | null
    created_by: string
    created_at?: Date | string | null
  }

  export type transfersUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    transfer_number?: StringFieldUpdateOperationsInput | string
    asset_name?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    transfer_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type transfersUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    transfer_number?: StringFieldUpdateOperationsInput | string
    from_base_id?: StringFieldUpdateOperationsInput | string
    to_base_id?: StringFieldUpdateOperationsInput | string
    asset_name?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    transfer_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type usersCreateInput = {
    id?: string
    username: string
    email: string
    password_hash: string
    first_name: string
    last_name: string
    role: string
    is_active?: boolean | null
    created_at?: Date | string | null
    assignments?: assignmentsCreateNestedManyWithoutUsersInput
    audit_logs?: audit_logsCreateNestedManyWithoutUsersInput
    bases_bases_commander_idTousers?: basesCreateNestedManyWithoutUsers_bases_commander_idTousersInput
    expenditures_expenditures_authorized_byTousers?: expendituresCreateNestedManyWithoutUsers_expenditures_authorized_byTousersInput
    expenditures_expenditures_created_byTousers?: expendituresCreateNestedManyWithoutUsers_expenditures_created_byTousersInput
    purchases_purchases_approved_byTousers?: purchasesCreateNestedManyWithoutUsers_purchases_approved_byTousersInput
    purchases_purchases_created_byTousers?: purchasesCreateNestedManyWithoutUsers_purchases_created_byTousersInput
    transfers_transfers_approved_byTousers?: transfersCreateNestedManyWithoutUsers_transfers_approved_byTousersInput
    transfers_transfers_created_byTousers?: transfersCreateNestedManyWithoutUsers_transfers_created_byTousersInput
    bases_users_base_idTobases?: basesCreateNestedOneWithoutUsers_users_base_idTobasesInput
  }

  export type usersUncheckedCreateInput = {
    id?: string
    username: string
    email: string
    password_hash: string
    first_name: string
    last_name: string
    role: string
    base_id?: string | null
    is_active?: boolean | null
    created_at?: Date | string | null
    assignments?: assignmentsUncheckedCreateNestedManyWithoutUsersInput
    audit_logs?: audit_logsUncheckedCreateNestedManyWithoutUsersInput
    bases_bases_commander_idTousers?: basesUncheckedCreateNestedManyWithoutUsers_bases_commander_idTousersInput
    expenditures_expenditures_authorized_byTousers?: expendituresUncheckedCreateNestedManyWithoutUsers_expenditures_authorized_byTousersInput
    expenditures_expenditures_created_byTousers?: expendituresUncheckedCreateNestedManyWithoutUsers_expenditures_created_byTousersInput
    purchases_purchases_approved_byTousers?: purchasesUncheckedCreateNestedManyWithoutUsers_purchases_approved_byTousersInput
    purchases_purchases_created_byTousers?: purchasesUncheckedCreateNestedManyWithoutUsers_purchases_created_byTousersInput
    transfers_transfers_approved_byTousers?: transfersUncheckedCreateNestedManyWithoutUsers_transfers_approved_byTousersInput
    transfers_transfers_created_byTousers?: transfersUncheckedCreateNestedManyWithoutUsers_transfers_created_byTousersInput
  }

  export type usersUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignments?: assignmentsUpdateManyWithoutUsersNestedInput
    audit_logs?: audit_logsUpdateManyWithoutUsersNestedInput
    bases_bases_commander_idTousers?: basesUpdateManyWithoutUsers_bases_commander_idTousersNestedInput
    expenditures_expenditures_authorized_byTousers?: expendituresUpdateManyWithoutUsers_expenditures_authorized_byTousersNestedInput
    expenditures_expenditures_created_byTousers?: expendituresUpdateManyWithoutUsers_expenditures_created_byTousersNestedInput
    purchases_purchases_approved_byTousers?: purchasesUpdateManyWithoutUsers_purchases_approved_byTousersNestedInput
    purchases_purchases_created_byTousers?: purchasesUpdateManyWithoutUsers_purchases_created_byTousersNestedInput
    transfers_transfers_approved_byTousers?: transfersUpdateManyWithoutUsers_transfers_approved_byTousersNestedInput
    transfers_transfers_created_byTousers?: transfersUpdateManyWithoutUsers_transfers_created_byTousersNestedInput
    bases_users_base_idTobases?: basesUpdateOneWithoutUsers_users_base_idTobasesNestedInput
  }

  export type usersUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    base_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignments?: assignmentsUncheckedUpdateManyWithoutUsersNestedInput
    audit_logs?: audit_logsUncheckedUpdateManyWithoutUsersNestedInput
    bases_bases_commander_idTousers?: basesUncheckedUpdateManyWithoutUsers_bases_commander_idTousersNestedInput
    expenditures_expenditures_authorized_byTousers?: expendituresUncheckedUpdateManyWithoutUsers_expenditures_authorized_byTousersNestedInput
    expenditures_expenditures_created_byTousers?: expendituresUncheckedUpdateManyWithoutUsers_expenditures_created_byTousersNestedInput
    purchases_purchases_approved_byTousers?: purchasesUncheckedUpdateManyWithoutUsers_purchases_approved_byTousersNestedInput
    purchases_purchases_created_byTousers?: purchasesUncheckedUpdateManyWithoutUsers_purchases_created_byTousersNestedInput
    transfers_transfers_approved_byTousers?: transfersUncheckedUpdateManyWithoutUsers_transfers_approved_byTousersNestedInput
    transfers_transfers_created_byTousers?: transfersUncheckedUpdateManyWithoutUsers_transfers_created_byTousersNestedInput
  }

  export type usersCreateManyInput = {
    id?: string
    username: string
    email: string
    password_hash: string
    first_name: string
    last_name: string
    role: string
    base_id?: string | null
    is_active?: boolean | null
    created_at?: Date | string | null
  }

  export type usersUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type usersUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    base_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BasesScalarRelationFilter = {
    is?: basesWhereInput
    isNot?: basesWhereInput
  }

  export type PurchasesListRelationFilter = {
    every?: purchasesWhereInput
    some?: purchasesWhereInput
    none?: purchasesWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type purchasesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type assetsNameBase_idCompoundUniqueInput = {
    name: string
    base_id: string
  }

  export type assetsCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    base_id?: SortOrder
    quantity?: SortOrder
    available_quantity?: SortOrder
    assigned_quantity?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
  }

  export type assetsAvgOrderByAggregateInput = {
    quantity?: SortOrder
    available_quantity?: SortOrder
    assigned_quantity?: SortOrder
  }

  export type assetsMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    base_id?: SortOrder
    quantity?: SortOrder
    available_quantity?: SortOrder
    assigned_quantity?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
  }

  export type assetsMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    base_id?: SortOrder
    quantity?: SortOrder
    available_quantity?: SortOrder
    assigned_quantity?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
  }

  export type assetsSumOrderByAggregateInput = {
    quantity?: SortOrder
    available_quantity?: SortOrder
    assigned_quantity?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type UsersScalarRelationFilter = {
    is?: usersWhereInput
    isNot?: usersWhereInput
  }

  export type PersonnelScalarRelationFilter = {
    is?: personnelWhereInput
    isNot?: personnelWhereInput
  }

  export type assignmentsCountOrderByAggregateInput = {
    id?: SortOrder
    asset_name?: SortOrder
    assigned_to?: SortOrder
    assigned_by?: SortOrder
    base_id?: SortOrder
    quantity?: SortOrder
    expended_quantity?: SortOrder
    assignment_date?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    created_at?: SortOrder
  }

  export type assignmentsAvgOrderByAggregateInput = {
    quantity?: SortOrder
    expended_quantity?: SortOrder
  }

  export type assignmentsMaxOrderByAggregateInput = {
    id?: SortOrder
    asset_name?: SortOrder
    assigned_to?: SortOrder
    assigned_by?: SortOrder
    base_id?: SortOrder
    quantity?: SortOrder
    expended_quantity?: SortOrder
    assignment_date?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    created_at?: SortOrder
  }

  export type assignmentsMinOrderByAggregateInput = {
    id?: SortOrder
    asset_name?: SortOrder
    assigned_to?: SortOrder
    assigned_by?: SortOrder
    base_id?: SortOrder
    quantity?: SortOrder
    expended_quantity?: SortOrder
    assignment_date?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    created_at?: SortOrder
  }

  export type assignmentsSumOrderByAggregateInput = {
    quantity?: SortOrder
    expended_quantity?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type UsersNullableScalarRelationFilter = {
    is?: usersWhereInput | null
    isNot?: usersWhereInput | null
  }

  export type audit_logsCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    action?: SortOrder
    table_name?: SortOrder
    record_id?: SortOrder
    old_values?: SortOrder
    new_values?: SortOrder
    ip_address?: SortOrder
    user_agent?: SortOrder
    created_at?: SortOrder
  }

  export type audit_logsMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    action?: SortOrder
    table_name?: SortOrder
    record_id?: SortOrder
    ip_address?: SortOrder
    user_agent?: SortOrder
    created_at?: SortOrder
  }

  export type audit_logsMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    action?: SortOrder
    table_name?: SortOrder
    record_id?: SortOrder
    ip_address?: SortOrder
    user_agent?: SortOrder
    created_at?: SortOrder
  }

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type AssetsListRelationFilter = {
    every?: assetsWhereInput
    some?: assetsWhereInput
    none?: assetsWhereInput
  }

  export type AssignmentsListRelationFilter = {
    every?: assignmentsWhereInput
    some?: assignmentsWhereInput
    none?: assignmentsWhereInput
  }

  export type ExpendituresListRelationFilter = {
    every?: expendituresWhereInput
    some?: expendituresWhereInput
    none?: expendituresWhereInput
  }

  export type PersonnelListRelationFilter = {
    every?: personnelWhereInput
    some?: personnelWhereInput
    none?: personnelWhereInput
  }

  export type TransfersListRelationFilter = {
    every?: transfersWhereInput
    some?: transfersWhereInput
    none?: transfersWhereInput
  }

  export type UsersListRelationFilter = {
    every?: usersWhereInput
    some?: usersWhereInput
    none?: usersWhereInput
  }

  export type assetsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type assignmentsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type expendituresOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type personnelOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type transfersOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type usersOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type basesCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    location?: SortOrder
    commander_id?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
  }

  export type basesMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    location?: SortOrder
    commander_id?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
  }

  export type basesMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    location?: SortOrder
    commander_id?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type PersonnelNullableScalarRelationFilter = {
    is?: personnelWhereInput | null
    isNot?: personnelWhereInput | null
  }

  export type expendituresCountOrderByAggregateInput = {
    id?: SortOrder
    asset_name?: SortOrder
    base_id?: SortOrder
    personnel_id?: SortOrder
    quantity?: SortOrder
    expenditure_date?: SortOrder
    reason?: SortOrder
    authorized_by?: SortOrder
    notes?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
  }

  export type expendituresAvgOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type expendituresMaxOrderByAggregateInput = {
    id?: SortOrder
    asset_name?: SortOrder
    base_id?: SortOrder
    personnel_id?: SortOrder
    quantity?: SortOrder
    expenditure_date?: SortOrder
    reason?: SortOrder
    authorized_by?: SortOrder
    notes?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
  }

  export type expendituresMinOrderByAggregateInput = {
    id?: SortOrder
    asset_name?: SortOrder
    base_id?: SortOrder
    personnel_id?: SortOrder
    quantity?: SortOrder
    expenditure_date?: SortOrder
    reason?: SortOrder
    authorized_by?: SortOrder
    notes?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
  }

  export type expendituresSumOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type personnelFirst_nameLast_nameEmailCompoundUniqueInput = {
    first_name: string
    last_name: string
    email: string
  }

  export type personnelCountOrderByAggregateInput = {
    id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    rank?: SortOrder
    base_id?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    department?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
  }

  export type personnelMaxOrderByAggregateInput = {
    id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    rank?: SortOrder
    base_id?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    department?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
  }

  export type personnelMinOrderByAggregateInput = {
    id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    rank?: SortOrder
    base_id?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    department?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
  }

  export type AssetsScalarRelationFilter = {
    is?: assetsWhereInput
    isNot?: assetsWhereInput
  }

  export type purchasesCountOrderByAggregateInput = {
    id?: SortOrder
    asset_id?: SortOrder
    base_id?: SortOrder
    quantity?: SortOrder
    supplier?: SortOrder
    purchase_date?: SortOrder
    status?: SortOrder
    approved_by?: SortOrder
    approved_at?: SortOrder
    notes?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
  }

  export type purchasesAvgOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type purchasesMaxOrderByAggregateInput = {
    id?: SortOrder
    asset_id?: SortOrder
    base_id?: SortOrder
    quantity?: SortOrder
    supplier?: SortOrder
    purchase_date?: SortOrder
    status?: SortOrder
    approved_by?: SortOrder
    approved_at?: SortOrder
    notes?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
  }

  export type purchasesMinOrderByAggregateInput = {
    id?: SortOrder
    asset_id?: SortOrder
    base_id?: SortOrder
    quantity?: SortOrder
    supplier?: SortOrder
    purchase_date?: SortOrder
    status?: SortOrder
    approved_by?: SortOrder
    approved_at?: SortOrder
    notes?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
  }

  export type purchasesSumOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type transfersCountOrderByAggregateInput = {
    id?: SortOrder
    transfer_number?: SortOrder
    from_base_id?: SortOrder
    to_base_id?: SortOrder
    asset_name?: SortOrder
    quantity?: SortOrder
    transfer_date?: SortOrder
    status?: SortOrder
    approved_by?: SortOrder
    approved_at?: SortOrder
    notes?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
  }

  export type transfersAvgOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type transfersMaxOrderByAggregateInput = {
    id?: SortOrder
    transfer_number?: SortOrder
    from_base_id?: SortOrder
    to_base_id?: SortOrder
    asset_name?: SortOrder
    quantity?: SortOrder
    transfer_date?: SortOrder
    status?: SortOrder
    approved_by?: SortOrder
    approved_at?: SortOrder
    notes?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
  }

  export type transfersMinOrderByAggregateInput = {
    id?: SortOrder
    transfer_number?: SortOrder
    from_base_id?: SortOrder
    to_base_id?: SortOrder
    asset_name?: SortOrder
    quantity?: SortOrder
    transfer_date?: SortOrder
    status?: SortOrder
    approved_by?: SortOrder
    approved_at?: SortOrder
    notes?: SortOrder
    created_by?: SortOrder
    created_at?: SortOrder
  }

  export type transfersSumOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type Audit_logsListRelationFilter = {
    every?: audit_logsWhereInput
    some?: audit_logsWhereInput
    none?: audit_logsWhereInput
  }

  export type BasesListRelationFilter = {
    every?: basesWhereInput
    some?: basesWhereInput
    none?: basesWhereInput
  }

  export type BasesNullableScalarRelationFilter = {
    is?: basesWhereInput | null
    isNot?: basesWhereInput | null
  }

  export type audit_logsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type basesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type usersCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    role?: SortOrder
    base_id?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
  }

  export type usersMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    role?: SortOrder
    base_id?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
  }

  export type usersMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    role?: SortOrder
    base_id?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
  }

  export type basesCreateNestedOneWithoutAssetsInput = {
    create?: XOR<basesCreateWithoutAssetsInput, basesUncheckedCreateWithoutAssetsInput>
    connectOrCreate?: basesCreateOrConnectWithoutAssetsInput
    connect?: basesWhereUniqueInput
  }

  export type purchasesCreateNestedManyWithoutAssetsInput = {
    create?: XOR<purchasesCreateWithoutAssetsInput, purchasesUncheckedCreateWithoutAssetsInput> | purchasesCreateWithoutAssetsInput[] | purchasesUncheckedCreateWithoutAssetsInput[]
    connectOrCreate?: purchasesCreateOrConnectWithoutAssetsInput | purchasesCreateOrConnectWithoutAssetsInput[]
    createMany?: purchasesCreateManyAssetsInputEnvelope
    connect?: purchasesWhereUniqueInput | purchasesWhereUniqueInput[]
  }

  export type purchasesUncheckedCreateNestedManyWithoutAssetsInput = {
    create?: XOR<purchasesCreateWithoutAssetsInput, purchasesUncheckedCreateWithoutAssetsInput> | purchasesCreateWithoutAssetsInput[] | purchasesUncheckedCreateWithoutAssetsInput[]
    connectOrCreate?: purchasesCreateOrConnectWithoutAssetsInput | purchasesCreateOrConnectWithoutAssetsInput[]
    createMany?: purchasesCreateManyAssetsInputEnvelope
    connect?: purchasesWhereUniqueInput | purchasesWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type basesUpdateOneRequiredWithoutAssetsNestedInput = {
    create?: XOR<basesCreateWithoutAssetsInput, basesUncheckedCreateWithoutAssetsInput>
    connectOrCreate?: basesCreateOrConnectWithoutAssetsInput
    upsert?: basesUpsertWithoutAssetsInput
    connect?: basesWhereUniqueInput
    update?: XOR<XOR<basesUpdateToOneWithWhereWithoutAssetsInput, basesUpdateWithoutAssetsInput>, basesUncheckedUpdateWithoutAssetsInput>
  }

  export type purchasesUpdateManyWithoutAssetsNestedInput = {
    create?: XOR<purchasesCreateWithoutAssetsInput, purchasesUncheckedCreateWithoutAssetsInput> | purchasesCreateWithoutAssetsInput[] | purchasesUncheckedCreateWithoutAssetsInput[]
    connectOrCreate?: purchasesCreateOrConnectWithoutAssetsInput | purchasesCreateOrConnectWithoutAssetsInput[]
    upsert?: purchasesUpsertWithWhereUniqueWithoutAssetsInput | purchasesUpsertWithWhereUniqueWithoutAssetsInput[]
    createMany?: purchasesCreateManyAssetsInputEnvelope
    set?: purchasesWhereUniqueInput | purchasesWhereUniqueInput[]
    disconnect?: purchasesWhereUniqueInput | purchasesWhereUniqueInput[]
    delete?: purchasesWhereUniqueInput | purchasesWhereUniqueInput[]
    connect?: purchasesWhereUniqueInput | purchasesWhereUniqueInput[]
    update?: purchasesUpdateWithWhereUniqueWithoutAssetsInput | purchasesUpdateWithWhereUniqueWithoutAssetsInput[]
    updateMany?: purchasesUpdateManyWithWhereWithoutAssetsInput | purchasesUpdateManyWithWhereWithoutAssetsInput[]
    deleteMany?: purchasesScalarWhereInput | purchasesScalarWhereInput[]
  }

  export type purchasesUncheckedUpdateManyWithoutAssetsNestedInput = {
    create?: XOR<purchasesCreateWithoutAssetsInput, purchasesUncheckedCreateWithoutAssetsInput> | purchasesCreateWithoutAssetsInput[] | purchasesUncheckedCreateWithoutAssetsInput[]
    connectOrCreate?: purchasesCreateOrConnectWithoutAssetsInput | purchasesCreateOrConnectWithoutAssetsInput[]
    upsert?: purchasesUpsertWithWhereUniqueWithoutAssetsInput | purchasesUpsertWithWhereUniqueWithoutAssetsInput[]
    createMany?: purchasesCreateManyAssetsInputEnvelope
    set?: purchasesWhereUniqueInput | purchasesWhereUniqueInput[]
    disconnect?: purchasesWhereUniqueInput | purchasesWhereUniqueInput[]
    delete?: purchasesWhereUniqueInput | purchasesWhereUniqueInput[]
    connect?: purchasesWhereUniqueInput | purchasesWhereUniqueInput[]
    update?: purchasesUpdateWithWhereUniqueWithoutAssetsInput | purchasesUpdateWithWhereUniqueWithoutAssetsInput[]
    updateMany?: purchasesUpdateManyWithWhereWithoutAssetsInput | purchasesUpdateManyWithWhereWithoutAssetsInput[]
    deleteMany?: purchasesScalarWhereInput | purchasesScalarWhereInput[]
  }

  export type usersCreateNestedOneWithoutAssignmentsInput = {
    create?: XOR<usersCreateWithoutAssignmentsInput, usersUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: usersCreateOrConnectWithoutAssignmentsInput
    connect?: usersWhereUniqueInput
  }

  export type personnelCreateNestedOneWithoutAssignmentsInput = {
    create?: XOR<personnelCreateWithoutAssignmentsInput, personnelUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: personnelCreateOrConnectWithoutAssignmentsInput
    connect?: personnelWhereUniqueInput
  }

  export type basesCreateNestedOneWithoutAssignmentsInput = {
    create?: XOR<basesCreateWithoutAssignmentsInput, basesUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: basesCreateOrConnectWithoutAssignmentsInput
    connect?: basesWhereUniqueInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type usersUpdateOneRequiredWithoutAssignmentsNestedInput = {
    create?: XOR<usersCreateWithoutAssignmentsInput, usersUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: usersCreateOrConnectWithoutAssignmentsInput
    upsert?: usersUpsertWithoutAssignmentsInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutAssignmentsInput, usersUpdateWithoutAssignmentsInput>, usersUncheckedUpdateWithoutAssignmentsInput>
  }

  export type personnelUpdateOneRequiredWithoutAssignmentsNestedInput = {
    create?: XOR<personnelCreateWithoutAssignmentsInput, personnelUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: personnelCreateOrConnectWithoutAssignmentsInput
    upsert?: personnelUpsertWithoutAssignmentsInput
    connect?: personnelWhereUniqueInput
    update?: XOR<XOR<personnelUpdateToOneWithWhereWithoutAssignmentsInput, personnelUpdateWithoutAssignmentsInput>, personnelUncheckedUpdateWithoutAssignmentsInput>
  }

  export type basesUpdateOneRequiredWithoutAssignmentsNestedInput = {
    create?: XOR<basesCreateWithoutAssignmentsInput, basesUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: basesCreateOrConnectWithoutAssignmentsInput
    upsert?: basesUpsertWithoutAssignmentsInput
    connect?: basesWhereUniqueInput
    update?: XOR<XOR<basesUpdateToOneWithWhereWithoutAssignmentsInput, basesUpdateWithoutAssignmentsInput>, basesUncheckedUpdateWithoutAssignmentsInput>
  }

  export type usersCreateNestedOneWithoutAudit_logsInput = {
    create?: XOR<usersCreateWithoutAudit_logsInput, usersUncheckedCreateWithoutAudit_logsInput>
    connectOrCreate?: usersCreateOrConnectWithoutAudit_logsInput
    connect?: usersWhereUniqueInput
  }

  export type usersUpdateOneWithoutAudit_logsNestedInput = {
    create?: XOR<usersCreateWithoutAudit_logsInput, usersUncheckedCreateWithoutAudit_logsInput>
    connectOrCreate?: usersCreateOrConnectWithoutAudit_logsInput
    upsert?: usersUpsertWithoutAudit_logsInput
    disconnect?: usersWhereInput | boolean
    delete?: usersWhereInput | boolean
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutAudit_logsInput, usersUpdateWithoutAudit_logsInput>, usersUncheckedUpdateWithoutAudit_logsInput>
  }

  export type assetsCreateNestedManyWithoutBasesInput = {
    create?: XOR<assetsCreateWithoutBasesInput, assetsUncheckedCreateWithoutBasesInput> | assetsCreateWithoutBasesInput[] | assetsUncheckedCreateWithoutBasesInput[]
    connectOrCreate?: assetsCreateOrConnectWithoutBasesInput | assetsCreateOrConnectWithoutBasesInput[]
    createMany?: assetsCreateManyBasesInputEnvelope
    connect?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
  }

  export type assignmentsCreateNestedManyWithoutBasesInput = {
    create?: XOR<assignmentsCreateWithoutBasesInput, assignmentsUncheckedCreateWithoutBasesInput> | assignmentsCreateWithoutBasesInput[] | assignmentsUncheckedCreateWithoutBasesInput[]
    connectOrCreate?: assignmentsCreateOrConnectWithoutBasesInput | assignmentsCreateOrConnectWithoutBasesInput[]
    createMany?: assignmentsCreateManyBasesInputEnvelope
    connect?: assignmentsWhereUniqueInput | assignmentsWhereUniqueInput[]
  }

  export type usersCreateNestedOneWithoutBases_bases_commander_idTousersInput = {
    create?: XOR<usersCreateWithoutBases_bases_commander_idTousersInput, usersUncheckedCreateWithoutBases_bases_commander_idTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutBases_bases_commander_idTousersInput
    connect?: usersWhereUniqueInput
  }

  export type expendituresCreateNestedManyWithoutBasesInput = {
    create?: XOR<expendituresCreateWithoutBasesInput, expendituresUncheckedCreateWithoutBasesInput> | expendituresCreateWithoutBasesInput[] | expendituresUncheckedCreateWithoutBasesInput[]
    connectOrCreate?: expendituresCreateOrConnectWithoutBasesInput | expendituresCreateOrConnectWithoutBasesInput[]
    createMany?: expendituresCreateManyBasesInputEnvelope
    connect?: expendituresWhereUniqueInput | expendituresWhereUniqueInput[]
  }

  export type personnelCreateNestedManyWithoutBasesInput = {
    create?: XOR<personnelCreateWithoutBasesInput, personnelUncheckedCreateWithoutBasesInput> | personnelCreateWithoutBasesInput[] | personnelUncheckedCreateWithoutBasesInput[]
    connectOrCreate?: personnelCreateOrConnectWithoutBasesInput | personnelCreateOrConnectWithoutBasesInput[]
    createMany?: personnelCreateManyBasesInputEnvelope
    connect?: personnelWhereUniqueInput | personnelWhereUniqueInput[]
  }

  export type purchasesCreateNestedManyWithoutBasesInput = {
    create?: XOR<purchasesCreateWithoutBasesInput, purchasesUncheckedCreateWithoutBasesInput> | purchasesCreateWithoutBasesInput[] | purchasesUncheckedCreateWithoutBasesInput[]
    connectOrCreate?: purchasesCreateOrConnectWithoutBasesInput | purchasesCreateOrConnectWithoutBasesInput[]
    createMany?: purchasesCreateManyBasesInputEnvelope
    connect?: purchasesWhereUniqueInput | purchasesWhereUniqueInput[]
  }

  export type transfersCreateNestedManyWithoutBases_transfers_from_base_idTobasesInput = {
    create?: XOR<transfersCreateWithoutBases_transfers_from_base_idTobasesInput, transfersUncheckedCreateWithoutBases_transfers_from_base_idTobasesInput> | transfersCreateWithoutBases_transfers_from_base_idTobasesInput[] | transfersUncheckedCreateWithoutBases_transfers_from_base_idTobasesInput[]
    connectOrCreate?: transfersCreateOrConnectWithoutBases_transfers_from_base_idTobasesInput | transfersCreateOrConnectWithoutBases_transfers_from_base_idTobasesInput[]
    createMany?: transfersCreateManyBases_transfers_from_base_idTobasesInputEnvelope
    connect?: transfersWhereUniqueInput | transfersWhereUniqueInput[]
  }

  export type transfersCreateNestedManyWithoutBases_transfers_to_base_idTobasesInput = {
    create?: XOR<transfersCreateWithoutBases_transfers_to_base_idTobasesInput, transfersUncheckedCreateWithoutBases_transfers_to_base_idTobasesInput> | transfersCreateWithoutBases_transfers_to_base_idTobasesInput[] | transfersUncheckedCreateWithoutBases_transfers_to_base_idTobasesInput[]
    connectOrCreate?: transfersCreateOrConnectWithoutBases_transfers_to_base_idTobasesInput | transfersCreateOrConnectWithoutBases_transfers_to_base_idTobasesInput[]
    createMany?: transfersCreateManyBases_transfers_to_base_idTobasesInputEnvelope
    connect?: transfersWhereUniqueInput | transfersWhereUniqueInput[]
  }

  export type usersCreateNestedManyWithoutBases_users_base_idTobasesInput = {
    create?: XOR<usersCreateWithoutBases_users_base_idTobasesInput, usersUncheckedCreateWithoutBases_users_base_idTobasesInput> | usersCreateWithoutBases_users_base_idTobasesInput[] | usersUncheckedCreateWithoutBases_users_base_idTobasesInput[]
    connectOrCreate?: usersCreateOrConnectWithoutBases_users_base_idTobasesInput | usersCreateOrConnectWithoutBases_users_base_idTobasesInput[]
    createMany?: usersCreateManyBases_users_base_idTobasesInputEnvelope
    connect?: usersWhereUniqueInput | usersWhereUniqueInput[]
  }

  export type assetsUncheckedCreateNestedManyWithoutBasesInput = {
    create?: XOR<assetsCreateWithoutBasesInput, assetsUncheckedCreateWithoutBasesInput> | assetsCreateWithoutBasesInput[] | assetsUncheckedCreateWithoutBasesInput[]
    connectOrCreate?: assetsCreateOrConnectWithoutBasesInput | assetsCreateOrConnectWithoutBasesInput[]
    createMany?: assetsCreateManyBasesInputEnvelope
    connect?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
  }

  export type assignmentsUncheckedCreateNestedManyWithoutBasesInput = {
    create?: XOR<assignmentsCreateWithoutBasesInput, assignmentsUncheckedCreateWithoutBasesInput> | assignmentsCreateWithoutBasesInput[] | assignmentsUncheckedCreateWithoutBasesInput[]
    connectOrCreate?: assignmentsCreateOrConnectWithoutBasesInput | assignmentsCreateOrConnectWithoutBasesInput[]
    createMany?: assignmentsCreateManyBasesInputEnvelope
    connect?: assignmentsWhereUniqueInput | assignmentsWhereUniqueInput[]
  }

  export type expendituresUncheckedCreateNestedManyWithoutBasesInput = {
    create?: XOR<expendituresCreateWithoutBasesInput, expendituresUncheckedCreateWithoutBasesInput> | expendituresCreateWithoutBasesInput[] | expendituresUncheckedCreateWithoutBasesInput[]
    connectOrCreate?: expendituresCreateOrConnectWithoutBasesInput | expendituresCreateOrConnectWithoutBasesInput[]
    createMany?: expendituresCreateManyBasesInputEnvelope
    connect?: expendituresWhereUniqueInput | expendituresWhereUniqueInput[]
  }

  export type personnelUncheckedCreateNestedManyWithoutBasesInput = {
    create?: XOR<personnelCreateWithoutBasesInput, personnelUncheckedCreateWithoutBasesInput> | personnelCreateWithoutBasesInput[] | personnelUncheckedCreateWithoutBasesInput[]
    connectOrCreate?: personnelCreateOrConnectWithoutBasesInput | personnelCreateOrConnectWithoutBasesInput[]
    createMany?: personnelCreateManyBasesInputEnvelope
    connect?: personnelWhereUniqueInput | personnelWhereUniqueInput[]
  }

  export type purchasesUncheckedCreateNestedManyWithoutBasesInput = {
    create?: XOR<purchasesCreateWithoutBasesInput, purchasesUncheckedCreateWithoutBasesInput> | purchasesCreateWithoutBasesInput[] | purchasesUncheckedCreateWithoutBasesInput[]
    connectOrCreate?: purchasesCreateOrConnectWithoutBasesInput | purchasesCreateOrConnectWithoutBasesInput[]
    createMany?: purchasesCreateManyBasesInputEnvelope
    connect?: purchasesWhereUniqueInput | purchasesWhereUniqueInput[]
  }

  export type transfersUncheckedCreateNestedManyWithoutBases_transfers_from_base_idTobasesInput = {
    create?: XOR<transfersCreateWithoutBases_transfers_from_base_idTobasesInput, transfersUncheckedCreateWithoutBases_transfers_from_base_idTobasesInput> | transfersCreateWithoutBases_transfers_from_base_idTobasesInput[] | transfersUncheckedCreateWithoutBases_transfers_from_base_idTobasesInput[]
    connectOrCreate?: transfersCreateOrConnectWithoutBases_transfers_from_base_idTobasesInput | transfersCreateOrConnectWithoutBases_transfers_from_base_idTobasesInput[]
    createMany?: transfersCreateManyBases_transfers_from_base_idTobasesInputEnvelope
    connect?: transfersWhereUniqueInput | transfersWhereUniqueInput[]
  }

  export type transfersUncheckedCreateNestedManyWithoutBases_transfers_to_base_idTobasesInput = {
    create?: XOR<transfersCreateWithoutBases_transfers_to_base_idTobasesInput, transfersUncheckedCreateWithoutBases_transfers_to_base_idTobasesInput> | transfersCreateWithoutBases_transfers_to_base_idTobasesInput[] | transfersUncheckedCreateWithoutBases_transfers_to_base_idTobasesInput[]
    connectOrCreate?: transfersCreateOrConnectWithoutBases_transfers_to_base_idTobasesInput | transfersCreateOrConnectWithoutBases_transfers_to_base_idTobasesInput[]
    createMany?: transfersCreateManyBases_transfers_to_base_idTobasesInputEnvelope
    connect?: transfersWhereUniqueInput | transfersWhereUniqueInput[]
  }

  export type usersUncheckedCreateNestedManyWithoutBases_users_base_idTobasesInput = {
    create?: XOR<usersCreateWithoutBases_users_base_idTobasesInput, usersUncheckedCreateWithoutBases_users_base_idTobasesInput> | usersCreateWithoutBases_users_base_idTobasesInput[] | usersUncheckedCreateWithoutBases_users_base_idTobasesInput[]
    connectOrCreate?: usersCreateOrConnectWithoutBases_users_base_idTobasesInput | usersCreateOrConnectWithoutBases_users_base_idTobasesInput[]
    createMany?: usersCreateManyBases_users_base_idTobasesInputEnvelope
    connect?: usersWhereUniqueInput | usersWhereUniqueInput[]
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type assetsUpdateManyWithoutBasesNestedInput = {
    create?: XOR<assetsCreateWithoutBasesInput, assetsUncheckedCreateWithoutBasesInput> | assetsCreateWithoutBasesInput[] | assetsUncheckedCreateWithoutBasesInput[]
    connectOrCreate?: assetsCreateOrConnectWithoutBasesInput | assetsCreateOrConnectWithoutBasesInput[]
    upsert?: assetsUpsertWithWhereUniqueWithoutBasesInput | assetsUpsertWithWhereUniqueWithoutBasesInput[]
    createMany?: assetsCreateManyBasesInputEnvelope
    set?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    disconnect?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    delete?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    connect?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    update?: assetsUpdateWithWhereUniqueWithoutBasesInput | assetsUpdateWithWhereUniqueWithoutBasesInput[]
    updateMany?: assetsUpdateManyWithWhereWithoutBasesInput | assetsUpdateManyWithWhereWithoutBasesInput[]
    deleteMany?: assetsScalarWhereInput | assetsScalarWhereInput[]
  }

  export type assignmentsUpdateManyWithoutBasesNestedInput = {
    create?: XOR<assignmentsCreateWithoutBasesInput, assignmentsUncheckedCreateWithoutBasesInput> | assignmentsCreateWithoutBasesInput[] | assignmentsUncheckedCreateWithoutBasesInput[]
    connectOrCreate?: assignmentsCreateOrConnectWithoutBasesInput | assignmentsCreateOrConnectWithoutBasesInput[]
    upsert?: assignmentsUpsertWithWhereUniqueWithoutBasesInput | assignmentsUpsertWithWhereUniqueWithoutBasesInput[]
    createMany?: assignmentsCreateManyBasesInputEnvelope
    set?: assignmentsWhereUniqueInput | assignmentsWhereUniqueInput[]
    disconnect?: assignmentsWhereUniqueInput | assignmentsWhereUniqueInput[]
    delete?: assignmentsWhereUniqueInput | assignmentsWhereUniqueInput[]
    connect?: assignmentsWhereUniqueInput | assignmentsWhereUniqueInput[]
    update?: assignmentsUpdateWithWhereUniqueWithoutBasesInput | assignmentsUpdateWithWhereUniqueWithoutBasesInput[]
    updateMany?: assignmentsUpdateManyWithWhereWithoutBasesInput | assignmentsUpdateManyWithWhereWithoutBasesInput[]
    deleteMany?: assignmentsScalarWhereInput | assignmentsScalarWhereInput[]
  }

  export type usersUpdateOneWithoutBases_bases_commander_idTousersNestedInput = {
    create?: XOR<usersCreateWithoutBases_bases_commander_idTousersInput, usersUncheckedCreateWithoutBases_bases_commander_idTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutBases_bases_commander_idTousersInput
    upsert?: usersUpsertWithoutBases_bases_commander_idTousersInput
    disconnect?: usersWhereInput | boolean
    delete?: usersWhereInput | boolean
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutBases_bases_commander_idTousersInput, usersUpdateWithoutBases_bases_commander_idTousersInput>, usersUncheckedUpdateWithoutBases_bases_commander_idTousersInput>
  }

  export type expendituresUpdateManyWithoutBasesNestedInput = {
    create?: XOR<expendituresCreateWithoutBasesInput, expendituresUncheckedCreateWithoutBasesInput> | expendituresCreateWithoutBasesInput[] | expendituresUncheckedCreateWithoutBasesInput[]
    connectOrCreate?: expendituresCreateOrConnectWithoutBasesInput | expendituresCreateOrConnectWithoutBasesInput[]
    upsert?: expendituresUpsertWithWhereUniqueWithoutBasesInput | expendituresUpsertWithWhereUniqueWithoutBasesInput[]
    createMany?: expendituresCreateManyBasesInputEnvelope
    set?: expendituresWhereUniqueInput | expendituresWhereUniqueInput[]
    disconnect?: expendituresWhereUniqueInput | expendituresWhereUniqueInput[]
    delete?: expendituresWhereUniqueInput | expendituresWhereUniqueInput[]
    connect?: expendituresWhereUniqueInput | expendituresWhereUniqueInput[]
    update?: expendituresUpdateWithWhereUniqueWithoutBasesInput | expendituresUpdateWithWhereUniqueWithoutBasesInput[]
    updateMany?: expendituresUpdateManyWithWhereWithoutBasesInput | expendituresUpdateManyWithWhereWithoutBasesInput[]
    deleteMany?: expendituresScalarWhereInput | expendituresScalarWhereInput[]
  }

  export type personnelUpdateManyWithoutBasesNestedInput = {
    create?: XOR<personnelCreateWithoutBasesInput, personnelUncheckedCreateWithoutBasesInput> | personnelCreateWithoutBasesInput[] | personnelUncheckedCreateWithoutBasesInput[]
    connectOrCreate?: personnelCreateOrConnectWithoutBasesInput | personnelCreateOrConnectWithoutBasesInput[]
    upsert?: personnelUpsertWithWhereUniqueWithoutBasesInput | personnelUpsertWithWhereUniqueWithoutBasesInput[]
    createMany?: personnelCreateManyBasesInputEnvelope
    set?: personnelWhereUniqueInput | personnelWhereUniqueInput[]
    disconnect?: personnelWhereUniqueInput | personnelWhereUniqueInput[]
    delete?: personnelWhereUniqueInput | personnelWhereUniqueInput[]
    connect?: personnelWhereUniqueInput | personnelWhereUniqueInput[]
    update?: personnelUpdateWithWhereUniqueWithoutBasesInput | personnelUpdateWithWhereUniqueWithoutBasesInput[]
    updateMany?: personnelUpdateManyWithWhereWithoutBasesInput | personnelUpdateManyWithWhereWithoutBasesInput[]
    deleteMany?: personnelScalarWhereInput | personnelScalarWhereInput[]
  }

  export type purchasesUpdateManyWithoutBasesNestedInput = {
    create?: XOR<purchasesCreateWithoutBasesInput, purchasesUncheckedCreateWithoutBasesInput> | purchasesCreateWithoutBasesInput[] | purchasesUncheckedCreateWithoutBasesInput[]
    connectOrCreate?: purchasesCreateOrConnectWithoutBasesInput | purchasesCreateOrConnectWithoutBasesInput[]
    upsert?: purchasesUpsertWithWhereUniqueWithoutBasesInput | purchasesUpsertWithWhereUniqueWithoutBasesInput[]
    createMany?: purchasesCreateManyBasesInputEnvelope
    set?: purchasesWhereUniqueInput | purchasesWhereUniqueInput[]
    disconnect?: purchasesWhereUniqueInput | purchasesWhereUniqueInput[]
    delete?: purchasesWhereUniqueInput | purchasesWhereUniqueInput[]
    connect?: purchasesWhereUniqueInput | purchasesWhereUniqueInput[]
    update?: purchasesUpdateWithWhereUniqueWithoutBasesInput | purchasesUpdateWithWhereUniqueWithoutBasesInput[]
    updateMany?: purchasesUpdateManyWithWhereWithoutBasesInput | purchasesUpdateManyWithWhereWithoutBasesInput[]
    deleteMany?: purchasesScalarWhereInput | purchasesScalarWhereInput[]
  }

  export type transfersUpdateManyWithoutBases_transfers_from_base_idTobasesNestedInput = {
    create?: XOR<transfersCreateWithoutBases_transfers_from_base_idTobasesInput, transfersUncheckedCreateWithoutBases_transfers_from_base_idTobasesInput> | transfersCreateWithoutBases_transfers_from_base_idTobasesInput[] | transfersUncheckedCreateWithoutBases_transfers_from_base_idTobasesInput[]
    connectOrCreate?: transfersCreateOrConnectWithoutBases_transfers_from_base_idTobasesInput | transfersCreateOrConnectWithoutBases_transfers_from_base_idTobasesInput[]
    upsert?: transfersUpsertWithWhereUniqueWithoutBases_transfers_from_base_idTobasesInput | transfersUpsertWithWhereUniqueWithoutBases_transfers_from_base_idTobasesInput[]
    createMany?: transfersCreateManyBases_transfers_from_base_idTobasesInputEnvelope
    set?: transfersWhereUniqueInput | transfersWhereUniqueInput[]
    disconnect?: transfersWhereUniqueInput | transfersWhereUniqueInput[]
    delete?: transfersWhereUniqueInput | transfersWhereUniqueInput[]
    connect?: transfersWhereUniqueInput | transfersWhereUniqueInput[]
    update?: transfersUpdateWithWhereUniqueWithoutBases_transfers_from_base_idTobasesInput | transfersUpdateWithWhereUniqueWithoutBases_transfers_from_base_idTobasesInput[]
    updateMany?: transfersUpdateManyWithWhereWithoutBases_transfers_from_base_idTobasesInput | transfersUpdateManyWithWhereWithoutBases_transfers_from_base_idTobasesInput[]
    deleteMany?: transfersScalarWhereInput | transfersScalarWhereInput[]
  }

  export type transfersUpdateManyWithoutBases_transfers_to_base_idTobasesNestedInput = {
    create?: XOR<transfersCreateWithoutBases_transfers_to_base_idTobasesInput, transfersUncheckedCreateWithoutBases_transfers_to_base_idTobasesInput> | transfersCreateWithoutBases_transfers_to_base_idTobasesInput[] | transfersUncheckedCreateWithoutBases_transfers_to_base_idTobasesInput[]
    connectOrCreate?: transfersCreateOrConnectWithoutBases_transfers_to_base_idTobasesInput | transfersCreateOrConnectWithoutBases_transfers_to_base_idTobasesInput[]
    upsert?: transfersUpsertWithWhereUniqueWithoutBases_transfers_to_base_idTobasesInput | transfersUpsertWithWhereUniqueWithoutBases_transfers_to_base_idTobasesInput[]
    createMany?: transfersCreateManyBases_transfers_to_base_idTobasesInputEnvelope
    set?: transfersWhereUniqueInput | transfersWhereUniqueInput[]
    disconnect?: transfersWhereUniqueInput | transfersWhereUniqueInput[]
    delete?: transfersWhereUniqueInput | transfersWhereUniqueInput[]
    connect?: transfersWhereUniqueInput | transfersWhereUniqueInput[]
    update?: transfersUpdateWithWhereUniqueWithoutBases_transfers_to_base_idTobasesInput | transfersUpdateWithWhereUniqueWithoutBases_transfers_to_base_idTobasesInput[]
    updateMany?: transfersUpdateManyWithWhereWithoutBases_transfers_to_base_idTobasesInput | transfersUpdateManyWithWhereWithoutBases_transfers_to_base_idTobasesInput[]
    deleteMany?: transfersScalarWhereInput | transfersScalarWhereInput[]
  }

  export type usersUpdateManyWithoutBases_users_base_idTobasesNestedInput = {
    create?: XOR<usersCreateWithoutBases_users_base_idTobasesInput, usersUncheckedCreateWithoutBases_users_base_idTobasesInput> | usersCreateWithoutBases_users_base_idTobasesInput[] | usersUncheckedCreateWithoutBases_users_base_idTobasesInput[]
    connectOrCreate?: usersCreateOrConnectWithoutBases_users_base_idTobasesInput | usersCreateOrConnectWithoutBases_users_base_idTobasesInput[]
    upsert?: usersUpsertWithWhereUniqueWithoutBases_users_base_idTobasesInput | usersUpsertWithWhereUniqueWithoutBases_users_base_idTobasesInput[]
    createMany?: usersCreateManyBases_users_base_idTobasesInputEnvelope
    set?: usersWhereUniqueInput | usersWhereUniqueInput[]
    disconnect?: usersWhereUniqueInput | usersWhereUniqueInput[]
    delete?: usersWhereUniqueInput | usersWhereUniqueInput[]
    connect?: usersWhereUniqueInput | usersWhereUniqueInput[]
    update?: usersUpdateWithWhereUniqueWithoutBases_users_base_idTobasesInput | usersUpdateWithWhereUniqueWithoutBases_users_base_idTobasesInput[]
    updateMany?: usersUpdateManyWithWhereWithoutBases_users_base_idTobasesInput | usersUpdateManyWithWhereWithoutBases_users_base_idTobasesInput[]
    deleteMany?: usersScalarWhereInput | usersScalarWhereInput[]
  }

  export type assetsUncheckedUpdateManyWithoutBasesNestedInput = {
    create?: XOR<assetsCreateWithoutBasesInput, assetsUncheckedCreateWithoutBasesInput> | assetsCreateWithoutBasesInput[] | assetsUncheckedCreateWithoutBasesInput[]
    connectOrCreate?: assetsCreateOrConnectWithoutBasesInput | assetsCreateOrConnectWithoutBasesInput[]
    upsert?: assetsUpsertWithWhereUniqueWithoutBasesInput | assetsUpsertWithWhereUniqueWithoutBasesInput[]
    createMany?: assetsCreateManyBasesInputEnvelope
    set?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    disconnect?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    delete?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    connect?: assetsWhereUniqueInput | assetsWhereUniqueInput[]
    update?: assetsUpdateWithWhereUniqueWithoutBasesInput | assetsUpdateWithWhereUniqueWithoutBasesInput[]
    updateMany?: assetsUpdateManyWithWhereWithoutBasesInput | assetsUpdateManyWithWhereWithoutBasesInput[]
    deleteMany?: assetsScalarWhereInput | assetsScalarWhereInput[]
  }

  export type assignmentsUncheckedUpdateManyWithoutBasesNestedInput = {
    create?: XOR<assignmentsCreateWithoutBasesInput, assignmentsUncheckedCreateWithoutBasesInput> | assignmentsCreateWithoutBasesInput[] | assignmentsUncheckedCreateWithoutBasesInput[]
    connectOrCreate?: assignmentsCreateOrConnectWithoutBasesInput | assignmentsCreateOrConnectWithoutBasesInput[]
    upsert?: assignmentsUpsertWithWhereUniqueWithoutBasesInput | assignmentsUpsertWithWhereUniqueWithoutBasesInput[]
    createMany?: assignmentsCreateManyBasesInputEnvelope
    set?: assignmentsWhereUniqueInput | assignmentsWhereUniqueInput[]
    disconnect?: assignmentsWhereUniqueInput | assignmentsWhereUniqueInput[]
    delete?: assignmentsWhereUniqueInput | assignmentsWhereUniqueInput[]
    connect?: assignmentsWhereUniqueInput | assignmentsWhereUniqueInput[]
    update?: assignmentsUpdateWithWhereUniqueWithoutBasesInput | assignmentsUpdateWithWhereUniqueWithoutBasesInput[]
    updateMany?: assignmentsUpdateManyWithWhereWithoutBasesInput | assignmentsUpdateManyWithWhereWithoutBasesInput[]
    deleteMany?: assignmentsScalarWhereInput | assignmentsScalarWhereInput[]
  }

  export type expendituresUncheckedUpdateManyWithoutBasesNestedInput = {
    create?: XOR<expendituresCreateWithoutBasesInput, expendituresUncheckedCreateWithoutBasesInput> | expendituresCreateWithoutBasesInput[] | expendituresUncheckedCreateWithoutBasesInput[]
    connectOrCreate?: expendituresCreateOrConnectWithoutBasesInput | expendituresCreateOrConnectWithoutBasesInput[]
    upsert?: expendituresUpsertWithWhereUniqueWithoutBasesInput | expendituresUpsertWithWhereUniqueWithoutBasesInput[]
    createMany?: expendituresCreateManyBasesInputEnvelope
    set?: expendituresWhereUniqueInput | expendituresWhereUniqueInput[]
    disconnect?: expendituresWhereUniqueInput | expendituresWhereUniqueInput[]
    delete?: expendituresWhereUniqueInput | expendituresWhereUniqueInput[]
    connect?: expendituresWhereUniqueInput | expendituresWhereUniqueInput[]
    update?: expendituresUpdateWithWhereUniqueWithoutBasesInput | expendituresUpdateWithWhereUniqueWithoutBasesInput[]
    updateMany?: expendituresUpdateManyWithWhereWithoutBasesInput | expendituresUpdateManyWithWhereWithoutBasesInput[]
    deleteMany?: expendituresScalarWhereInput | expendituresScalarWhereInput[]
  }

  export type personnelUncheckedUpdateManyWithoutBasesNestedInput = {
    create?: XOR<personnelCreateWithoutBasesInput, personnelUncheckedCreateWithoutBasesInput> | personnelCreateWithoutBasesInput[] | personnelUncheckedCreateWithoutBasesInput[]
    connectOrCreate?: personnelCreateOrConnectWithoutBasesInput | personnelCreateOrConnectWithoutBasesInput[]
    upsert?: personnelUpsertWithWhereUniqueWithoutBasesInput | personnelUpsertWithWhereUniqueWithoutBasesInput[]
    createMany?: personnelCreateManyBasesInputEnvelope
    set?: personnelWhereUniqueInput | personnelWhereUniqueInput[]
    disconnect?: personnelWhereUniqueInput | personnelWhereUniqueInput[]
    delete?: personnelWhereUniqueInput | personnelWhereUniqueInput[]
    connect?: personnelWhereUniqueInput | personnelWhereUniqueInput[]
    update?: personnelUpdateWithWhereUniqueWithoutBasesInput | personnelUpdateWithWhereUniqueWithoutBasesInput[]
    updateMany?: personnelUpdateManyWithWhereWithoutBasesInput | personnelUpdateManyWithWhereWithoutBasesInput[]
    deleteMany?: personnelScalarWhereInput | personnelScalarWhereInput[]
  }

  export type purchasesUncheckedUpdateManyWithoutBasesNestedInput = {
    create?: XOR<purchasesCreateWithoutBasesInput, purchasesUncheckedCreateWithoutBasesInput> | purchasesCreateWithoutBasesInput[] | purchasesUncheckedCreateWithoutBasesInput[]
    connectOrCreate?: purchasesCreateOrConnectWithoutBasesInput | purchasesCreateOrConnectWithoutBasesInput[]
    upsert?: purchasesUpsertWithWhereUniqueWithoutBasesInput | purchasesUpsertWithWhereUniqueWithoutBasesInput[]
    createMany?: purchasesCreateManyBasesInputEnvelope
    set?: purchasesWhereUniqueInput | purchasesWhereUniqueInput[]
    disconnect?: purchasesWhereUniqueInput | purchasesWhereUniqueInput[]
    delete?: purchasesWhereUniqueInput | purchasesWhereUniqueInput[]
    connect?: purchasesWhereUniqueInput | purchasesWhereUniqueInput[]
    update?: purchasesUpdateWithWhereUniqueWithoutBasesInput | purchasesUpdateWithWhereUniqueWithoutBasesInput[]
    updateMany?: purchasesUpdateManyWithWhereWithoutBasesInput | purchasesUpdateManyWithWhereWithoutBasesInput[]
    deleteMany?: purchasesScalarWhereInput | purchasesScalarWhereInput[]
  }

  export type transfersUncheckedUpdateManyWithoutBases_transfers_from_base_idTobasesNestedInput = {
    create?: XOR<transfersCreateWithoutBases_transfers_from_base_idTobasesInput, transfersUncheckedCreateWithoutBases_transfers_from_base_idTobasesInput> | transfersCreateWithoutBases_transfers_from_base_idTobasesInput[] | transfersUncheckedCreateWithoutBases_transfers_from_base_idTobasesInput[]
    connectOrCreate?: transfersCreateOrConnectWithoutBases_transfers_from_base_idTobasesInput | transfersCreateOrConnectWithoutBases_transfers_from_base_idTobasesInput[]
    upsert?: transfersUpsertWithWhereUniqueWithoutBases_transfers_from_base_idTobasesInput | transfersUpsertWithWhereUniqueWithoutBases_transfers_from_base_idTobasesInput[]
    createMany?: transfersCreateManyBases_transfers_from_base_idTobasesInputEnvelope
    set?: transfersWhereUniqueInput | transfersWhereUniqueInput[]
    disconnect?: transfersWhereUniqueInput | transfersWhereUniqueInput[]
    delete?: transfersWhereUniqueInput | transfersWhereUniqueInput[]
    connect?: transfersWhereUniqueInput | transfersWhereUniqueInput[]
    update?: transfersUpdateWithWhereUniqueWithoutBases_transfers_from_base_idTobasesInput | transfersUpdateWithWhereUniqueWithoutBases_transfers_from_base_idTobasesInput[]
    updateMany?: transfersUpdateManyWithWhereWithoutBases_transfers_from_base_idTobasesInput | transfersUpdateManyWithWhereWithoutBases_transfers_from_base_idTobasesInput[]
    deleteMany?: transfersScalarWhereInput | transfersScalarWhereInput[]
  }

  export type transfersUncheckedUpdateManyWithoutBases_transfers_to_base_idTobasesNestedInput = {
    create?: XOR<transfersCreateWithoutBases_transfers_to_base_idTobasesInput, transfersUncheckedCreateWithoutBases_transfers_to_base_idTobasesInput> | transfersCreateWithoutBases_transfers_to_base_idTobasesInput[] | transfersUncheckedCreateWithoutBases_transfers_to_base_idTobasesInput[]
    connectOrCreate?: transfersCreateOrConnectWithoutBases_transfers_to_base_idTobasesInput | transfersCreateOrConnectWithoutBases_transfers_to_base_idTobasesInput[]
    upsert?: transfersUpsertWithWhereUniqueWithoutBases_transfers_to_base_idTobasesInput | transfersUpsertWithWhereUniqueWithoutBases_transfers_to_base_idTobasesInput[]
    createMany?: transfersCreateManyBases_transfers_to_base_idTobasesInputEnvelope
    set?: transfersWhereUniqueInput | transfersWhereUniqueInput[]
    disconnect?: transfersWhereUniqueInput | transfersWhereUniqueInput[]
    delete?: transfersWhereUniqueInput | transfersWhereUniqueInput[]
    connect?: transfersWhereUniqueInput | transfersWhereUniqueInput[]
    update?: transfersUpdateWithWhereUniqueWithoutBases_transfers_to_base_idTobasesInput | transfersUpdateWithWhereUniqueWithoutBases_transfers_to_base_idTobasesInput[]
    updateMany?: transfersUpdateManyWithWhereWithoutBases_transfers_to_base_idTobasesInput | transfersUpdateManyWithWhereWithoutBases_transfers_to_base_idTobasesInput[]
    deleteMany?: transfersScalarWhereInput | transfersScalarWhereInput[]
  }

  export type usersUncheckedUpdateManyWithoutBases_users_base_idTobasesNestedInput = {
    create?: XOR<usersCreateWithoutBases_users_base_idTobasesInput, usersUncheckedCreateWithoutBases_users_base_idTobasesInput> | usersCreateWithoutBases_users_base_idTobasesInput[] | usersUncheckedCreateWithoutBases_users_base_idTobasesInput[]
    connectOrCreate?: usersCreateOrConnectWithoutBases_users_base_idTobasesInput | usersCreateOrConnectWithoutBases_users_base_idTobasesInput[]
    upsert?: usersUpsertWithWhereUniqueWithoutBases_users_base_idTobasesInput | usersUpsertWithWhereUniqueWithoutBases_users_base_idTobasesInput[]
    createMany?: usersCreateManyBases_users_base_idTobasesInputEnvelope
    set?: usersWhereUniqueInput | usersWhereUniqueInput[]
    disconnect?: usersWhereUniqueInput | usersWhereUniqueInput[]
    delete?: usersWhereUniqueInput | usersWhereUniqueInput[]
    connect?: usersWhereUniqueInput | usersWhereUniqueInput[]
    update?: usersUpdateWithWhereUniqueWithoutBases_users_base_idTobasesInput | usersUpdateWithWhereUniqueWithoutBases_users_base_idTobasesInput[]
    updateMany?: usersUpdateManyWithWhereWithoutBases_users_base_idTobasesInput | usersUpdateManyWithWhereWithoutBases_users_base_idTobasesInput[]
    deleteMany?: usersScalarWhereInput | usersScalarWhereInput[]
  }

  export type usersCreateNestedOneWithoutExpenditures_expenditures_authorized_byTousersInput = {
    create?: XOR<usersCreateWithoutExpenditures_expenditures_authorized_byTousersInput, usersUncheckedCreateWithoutExpenditures_expenditures_authorized_byTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutExpenditures_expenditures_authorized_byTousersInput
    connect?: usersWhereUniqueInput
  }

  export type basesCreateNestedOneWithoutExpendituresInput = {
    create?: XOR<basesCreateWithoutExpendituresInput, basesUncheckedCreateWithoutExpendituresInput>
    connectOrCreate?: basesCreateOrConnectWithoutExpendituresInput
    connect?: basesWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutExpenditures_expenditures_created_byTousersInput = {
    create?: XOR<usersCreateWithoutExpenditures_expenditures_created_byTousersInput, usersUncheckedCreateWithoutExpenditures_expenditures_created_byTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutExpenditures_expenditures_created_byTousersInput
    connect?: usersWhereUniqueInput
  }

  export type personnelCreateNestedOneWithoutExpendituresInput = {
    create?: XOR<personnelCreateWithoutExpendituresInput, personnelUncheckedCreateWithoutExpendituresInput>
    connectOrCreate?: personnelCreateOrConnectWithoutExpendituresInput
    connect?: personnelWhereUniqueInput
  }

  export type usersUpdateOneWithoutExpenditures_expenditures_authorized_byTousersNestedInput = {
    create?: XOR<usersCreateWithoutExpenditures_expenditures_authorized_byTousersInput, usersUncheckedCreateWithoutExpenditures_expenditures_authorized_byTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutExpenditures_expenditures_authorized_byTousersInput
    upsert?: usersUpsertWithoutExpenditures_expenditures_authorized_byTousersInput
    disconnect?: usersWhereInput | boolean
    delete?: usersWhereInput | boolean
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutExpenditures_expenditures_authorized_byTousersInput, usersUpdateWithoutExpenditures_expenditures_authorized_byTousersInput>, usersUncheckedUpdateWithoutExpenditures_expenditures_authorized_byTousersInput>
  }

  export type basesUpdateOneRequiredWithoutExpendituresNestedInput = {
    create?: XOR<basesCreateWithoutExpendituresInput, basesUncheckedCreateWithoutExpendituresInput>
    connectOrCreate?: basesCreateOrConnectWithoutExpendituresInput
    upsert?: basesUpsertWithoutExpendituresInput
    connect?: basesWhereUniqueInput
    update?: XOR<XOR<basesUpdateToOneWithWhereWithoutExpendituresInput, basesUpdateWithoutExpendituresInput>, basesUncheckedUpdateWithoutExpendituresInput>
  }

  export type usersUpdateOneRequiredWithoutExpenditures_expenditures_created_byTousersNestedInput = {
    create?: XOR<usersCreateWithoutExpenditures_expenditures_created_byTousersInput, usersUncheckedCreateWithoutExpenditures_expenditures_created_byTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutExpenditures_expenditures_created_byTousersInput
    upsert?: usersUpsertWithoutExpenditures_expenditures_created_byTousersInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutExpenditures_expenditures_created_byTousersInput, usersUpdateWithoutExpenditures_expenditures_created_byTousersInput>, usersUncheckedUpdateWithoutExpenditures_expenditures_created_byTousersInput>
  }

  export type personnelUpdateOneWithoutExpendituresNestedInput = {
    create?: XOR<personnelCreateWithoutExpendituresInput, personnelUncheckedCreateWithoutExpendituresInput>
    connectOrCreate?: personnelCreateOrConnectWithoutExpendituresInput
    upsert?: personnelUpsertWithoutExpendituresInput
    disconnect?: personnelWhereInput | boolean
    delete?: personnelWhereInput | boolean
    connect?: personnelWhereUniqueInput
    update?: XOR<XOR<personnelUpdateToOneWithWhereWithoutExpendituresInput, personnelUpdateWithoutExpendituresInput>, personnelUncheckedUpdateWithoutExpendituresInput>
  }

  export type assignmentsCreateNestedManyWithoutPersonnelInput = {
    create?: XOR<assignmentsCreateWithoutPersonnelInput, assignmentsUncheckedCreateWithoutPersonnelInput> | assignmentsCreateWithoutPersonnelInput[] | assignmentsUncheckedCreateWithoutPersonnelInput[]
    connectOrCreate?: assignmentsCreateOrConnectWithoutPersonnelInput | assignmentsCreateOrConnectWithoutPersonnelInput[]
    createMany?: assignmentsCreateManyPersonnelInputEnvelope
    connect?: assignmentsWhereUniqueInput | assignmentsWhereUniqueInput[]
  }

  export type expendituresCreateNestedManyWithoutPersonnelInput = {
    create?: XOR<expendituresCreateWithoutPersonnelInput, expendituresUncheckedCreateWithoutPersonnelInput> | expendituresCreateWithoutPersonnelInput[] | expendituresUncheckedCreateWithoutPersonnelInput[]
    connectOrCreate?: expendituresCreateOrConnectWithoutPersonnelInput | expendituresCreateOrConnectWithoutPersonnelInput[]
    createMany?: expendituresCreateManyPersonnelInputEnvelope
    connect?: expendituresWhereUniqueInput | expendituresWhereUniqueInput[]
  }

  export type basesCreateNestedOneWithoutPersonnelInput = {
    create?: XOR<basesCreateWithoutPersonnelInput, basesUncheckedCreateWithoutPersonnelInput>
    connectOrCreate?: basesCreateOrConnectWithoutPersonnelInput
    connect?: basesWhereUniqueInput
  }

  export type assignmentsUncheckedCreateNestedManyWithoutPersonnelInput = {
    create?: XOR<assignmentsCreateWithoutPersonnelInput, assignmentsUncheckedCreateWithoutPersonnelInput> | assignmentsCreateWithoutPersonnelInput[] | assignmentsUncheckedCreateWithoutPersonnelInput[]
    connectOrCreate?: assignmentsCreateOrConnectWithoutPersonnelInput | assignmentsCreateOrConnectWithoutPersonnelInput[]
    createMany?: assignmentsCreateManyPersonnelInputEnvelope
    connect?: assignmentsWhereUniqueInput | assignmentsWhereUniqueInput[]
  }

  export type expendituresUncheckedCreateNestedManyWithoutPersonnelInput = {
    create?: XOR<expendituresCreateWithoutPersonnelInput, expendituresUncheckedCreateWithoutPersonnelInput> | expendituresCreateWithoutPersonnelInput[] | expendituresUncheckedCreateWithoutPersonnelInput[]
    connectOrCreate?: expendituresCreateOrConnectWithoutPersonnelInput | expendituresCreateOrConnectWithoutPersonnelInput[]
    createMany?: expendituresCreateManyPersonnelInputEnvelope
    connect?: expendituresWhereUniqueInput | expendituresWhereUniqueInput[]
  }

  export type assignmentsUpdateManyWithoutPersonnelNestedInput = {
    create?: XOR<assignmentsCreateWithoutPersonnelInput, assignmentsUncheckedCreateWithoutPersonnelInput> | assignmentsCreateWithoutPersonnelInput[] | assignmentsUncheckedCreateWithoutPersonnelInput[]
    connectOrCreate?: assignmentsCreateOrConnectWithoutPersonnelInput | assignmentsCreateOrConnectWithoutPersonnelInput[]
    upsert?: assignmentsUpsertWithWhereUniqueWithoutPersonnelInput | assignmentsUpsertWithWhereUniqueWithoutPersonnelInput[]
    createMany?: assignmentsCreateManyPersonnelInputEnvelope
    set?: assignmentsWhereUniqueInput | assignmentsWhereUniqueInput[]
    disconnect?: assignmentsWhereUniqueInput | assignmentsWhereUniqueInput[]
    delete?: assignmentsWhereUniqueInput | assignmentsWhereUniqueInput[]
    connect?: assignmentsWhereUniqueInput | assignmentsWhereUniqueInput[]
    update?: assignmentsUpdateWithWhereUniqueWithoutPersonnelInput | assignmentsUpdateWithWhereUniqueWithoutPersonnelInput[]
    updateMany?: assignmentsUpdateManyWithWhereWithoutPersonnelInput | assignmentsUpdateManyWithWhereWithoutPersonnelInput[]
    deleteMany?: assignmentsScalarWhereInput | assignmentsScalarWhereInput[]
  }

  export type expendituresUpdateManyWithoutPersonnelNestedInput = {
    create?: XOR<expendituresCreateWithoutPersonnelInput, expendituresUncheckedCreateWithoutPersonnelInput> | expendituresCreateWithoutPersonnelInput[] | expendituresUncheckedCreateWithoutPersonnelInput[]
    connectOrCreate?: expendituresCreateOrConnectWithoutPersonnelInput | expendituresCreateOrConnectWithoutPersonnelInput[]
    upsert?: expendituresUpsertWithWhereUniqueWithoutPersonnelInput | expendituresUpsertWithWhereUniqueWithoutPersonnelInput[]
    createMany?: expendituresCreateManyPersonnelInputEnvelope
    set?: expendituresWhereUniqueInput | expendituresWhereUniqueInput[]
    disconnect?: expendituresWhereUniqueInput | expendituresWhereUniqueInput[]
    delete?: expendituresWhereUniqueInput | expendituresWhereUniqueInput[]
    connect?: expendituresWhereUniqueInput | expendituresWhereUniqueInput[]
    update?: expendituresUpdateWithWhereUniqueWithoutPersonnelInput | expendituresUpdateWithWhereUniqueWithoutPersonnelInput[]
    updateMany?: expendituresUpdateManyWithWhereWithoutPersonnelInput | expendituresUpdateManyWithWhereWithoutPersonnelInput[]
    deleteMany?: expendituresScalarWhereInput | expendituresScalarWhereInput[]
  }

  export type basesUpdateOneRequiredWithoutPersonnelNestedInput = {
    create?: XOR<basesCreateWithoutPersonnelInput, basesUncheckedCreateWithoutPersonnelInput>
    connectOrCreate?: basesCreateOrConnectWithoutPersonnelInput
    upsert?: basesUpsertWithoutPersonnelInput
    connect?: basesWhereUniqueInput
    update?: XOR<XOR<basesUpdateToOneWithWhereWithoutPersonnelInput, basesUpdateWithoutPersonnelInput>, basesUncheckedUpdateWithoutPersonnelInput>
  }

  export type assignmentsUncheckedUpdateManyWithoutPersonnelNestedInput = {
    create?: XOR<assignmentsCreateWithoutPersonnelInput, assignmentsUncheckedCreateWithoutPersonnelInput> | assignmentsCreateWithoutPersonnelInput[] | assignmentsUncheckedCreateWithoutPersonnelInput[]
    connectOrCreate?: assignmentsCreateOrConnectWithoutPersonnelInput | assignmentsCreateOrConnectWithoutPersonnelInput[]
    upsert?: assignmentsUpsertWithWhereUniqueWithoutPersonnelInput | assignmentsUpsertWithWhereUniqueWithoutPersonnelInput[]
    createMany?: assignmentsCreateManyPersonnelInputEnvelope
    set?: assignmentsWhereUniqueInput | assignmentsWhereUniqueInput[]
    disconnect?: assignmentsWhereUniqueInput | assignmentsWhereUniqueInput[]
    delete?: assignmentsWhereUniqueInput | assignmentsWhereUniqueInput[]
    connect?: assignmentsWhereUniqueInput | assignmentsWhereUniqueInput[]
    update?: assignmentsUpdateWithWhereUniqueWithoutPersonnelInput | assignmentsUpdateWithWhereUniqueWithoutPersonnelInput[]
    updateMany?: assignmentsUpdateManyWithWhereWithoutPersonnelInput | assignmentsUpdateManyWithWhereWithoutPersonnelInput[]
    deleteMany?: assignmentsScalarWhereInput | assignmentsScalarWhereInput[]
  }

  export type expendituresUncheckedUpdateManyWithoutPersonnelNestedInput = {
    create?: XOR<expendituresCreateWithoutPersonnelInput, expendituresUncheckedCreateWithoutPersonnelInput> | expendituresCreateWithoutPersonnelInput[] | expendituresUncheckedCreateWithoutPersonnelInput[]
    connectOrCreate?: expendituresCreateOrConnectWithoutPersonnelInput | expendituresCreateOrConnectWithoutPersonnelInput[]
    upsert?: expendituresUpsertWithWhereUniqueWithoutPersonnelInput | expendituresUpsertWithWhereUniqueWithoutPersonnelInput[]
    createMany?: expendituresCreateManyPersonnelInputEnvelope
    set?: expendituresWhereUniqueInput | expendituresWhereUniqueInput[]
    disconnect?: expendituresWhereUniqueInput | expendituresWhereUniqueInput[]
    delete?: expendituresWhereUniqueInput | expendituresWhereUniqueInput[]
    connect?: expendituresWhereUniqueInput | expendituresWhereUniqueInput[]
    update?: expendituresUpdateWithWhereUniqueWithoutPersonnelInput | expendituresUpdateWithWhereUniqueWithoutPersonnelInput[]
    updateMany?: expendituresUpdateManyWithWhereWithoutPersonnelInput | expendituresUpdateManyWithWhereWithoutPersonnelInput[]
    deleteMany?: expendituresScalarWhereInput | expendituresScalarWhereInput[]
  }

  export type usersCreateNestedOneWithoutPurchases_purchases_approved_byTousersInput = {
    create?: XOR<usersCreateWithoutPurchases_purchases_approved_byTousersInput, usersUncheckedCreateWithoutPurchases_purchases_approved_byTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutPurchases_purchases_approved_byTousersInput
    connect?: usersWhereUniqueInput
  }

  export type assetsCreateNestedOneWithoutPurchasesInput = {
    create?: XOR<assetsCreateWithoutPurchasesInput, assetsUncheckedCreateWithoutPurchasesInput>
    connectOrCreate?: assetsCreateOrConnectWithoutPurchasesInput
    connect?: assetsWhereUniqueInput
  }

  export type basesCreateNestedOneWithoutPurchasesInput = {
    create?: XOR<basesCreateWithoutPurchasesInput, basesUncheckedCreateWithoutPurchasesInput>
    connectOrCreate?: basesCreateOrConnectWithoutPurchasesInput
    connect?: basesWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutPurchases_purchases_created_byTousersInput = {
    create?: XOR<usersCreateWithoutPurchases_purchases_created_byTousersInput, usersUncheckedCreateWithoutPurchases_purchases_created_byTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutPurchases_purchases_created_byTousersInput
    connect?: usersWhereUniqueInput
  }

  export type usersUpdateOneWithoutPurchases_purchases_approved_byTousersNestedInput = {
    create?: XOR<usersCreateWithoutPurchases_purchases_approved_byTousersInput, usersUncheckedCreateWithoutPurchases_purchases_approved_byTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutPurchases_purchases_approved_byTousersInput
    upsert?: usersUpsertWithoutPurchases_purchases_approved_byTousersInput
    disconnect?: usersWhereInput | boolean
    delete?: usersWhereInput | boolean
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutPurchases_purchases_approved_byTousersInput, usersUpdateWithoutPurchases_purchases_approved_byTousersInput>, usersUncheckedUpdateWithoutPurchases_purchases_approved_byTousersInput>
  }

  export type assetsUpdateOneRequiredWithoutPurchasesNestedInput = {
    create?: XOR<assetsCreateWithoutPurchasesInput, assetsUncheckedCreateWithoutPurchasesInput>
    connectOrCreate?: assetsCreateOrConnectWithoutPurchasesInput
    upsert?: assetsUpsertWithoutPurchasesInput
    connect?: assetsWhereUniqueInput
    update?: XOR<XOR<assetsUpdateToOneWithWhereWithoutPurchasesInput, assetsUpdateWithoutPurchasesInput>, assetsUncheckedUpdateWithoutPurchasesInput>
  }

  export type basesUpdateOneRequiredWithoutPurchasesNestedInput = {
    create?: XOR<basesCreateWithoutPurchasesInput, basesUncheckedCreateWithoutPurchasesInput>
    connectOrCreate?: basesCreateOrConnectWithoutPurchasesInput
    upsert?: basesUpsertWithoutPurchasesInput
    connect?: basesWhereUniqueInput
    update?: XOR<XOR<basesUpdateToOneWithWhereWithoutPurchasesInput, basesUpdateWithoutPurchasesInput>, basesUncheckedUpdateWithoutPurchasesInput>
  }

  export type usersUpdateOneRequiredWithoutPurchases_purchases_created_byTousersNestedInput = {
    create?: XOR<usersCreateWithoutPurchases_purchases_created_byTousersInput, usersUncheckedCreateWithoutPurchases_purchases_created_byTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutPurchases_purchases_created_byTousersInput
    upsert?: usersUpsertWithoutPurchases_purchases_created_byTousersInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutPurchases_purchases_created_byTousersInput, usersUpdateWithoutPurchases_purchases_created_byTousersInput>, usersUncheckedUpdateWithoutPurchases_purchases_created_byTousersInput>
  }

  export type usersCreateNestedOneWithoutTransfers_transfers_approved_byTousersInput = {
    create?: XOR<usersCreateWithoutTransfers_transfers_approved_byTousersInput, usersUncheckedCreateWithoutTransfers_transfers_approved_byTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutTransfers_transfers_approved_byTousersInput
    connect?: usersWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutTransfers_transfers_created_byTousersInput = {
    create?: XOR<usersCreateWithoutTransfers_transfers_created_byTousersInput, usersUncheckedCreateWithoutTransfers_transfers_created_byTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutTransfers_transfers_created_byTousersInput
    connect?: usersWhereUniqueInput
  }

  export type basesCreateNestedOneWithoutTransfers_transfers_from_base_idTobasesInput = {
    create?: XOR<basesCreateWithoutTransfers_transfers_from_base_idTobasesInput, basesUncheckedCreateWithoutTransfers_transfers_from_base_idTobasesInput>
    connectOrCreate?: basesCreateOrConnectWithoutTransfers_transfers_from_base_idTobasesInput
    connect?: basesWhereUniqueInput
  }

  export type basesCreateNestedOneWithoutTransfers_transfers_to_base_idTobasesInput = {
    create?: XOR<basesCreateWithoutTransfers_transfers_to_base_idTobasesInput, basesUncheckedCreateWithoutTransfers_transfers_to_base_idTobasesInput>
    connectOrCreate?: basesCreateOrConnectWithoutTransfers_transfers_to_base_idTobasesInput
    connect?: basesWhereUniqueInput
  }

  export type usersUpdateOneWithoutTransfers_transfers_approved_byTousersNestedInput = {
    create?: XOR<usersCreateWithoutTransfers_transfers_approved_byTousersInput, usersUncheckedCreateWithoutTransfers_transfers_approved_byTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutTransfers_transfers_approved_byTousersInput
    upsert?: usersUpsertWithoutTransfers_transfers_approved_byTousersInput
    disconnect?: usersWhereInput | boolean
    delete?: usersWhereInput | boolean
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutTransfers_transfers_approved_byTousersInput, usersUpdateWithoutTransfers_transfers_approved_byTousersInput>, usersUncheckedUpdateWithoutTransfers_transfers_approved_byTousersInput>
  }

  export type usersUpdateOneRequiredWithoutTransfers_transfers_created_byTousersNestedInput = {
    create?: XOR<usersCreateWithoutTransfers_transfers_created_byTousersInput, usersUncheckedCreateWithoutTransfers_transfers_created_byTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutTransfers_transfers_created_byTousersInput
    upsert?: usersUpsertWithoutTransfers_transfers_created_byTousersInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutTransfers_transfers_created_byTousersInput, usersUpdateWithoutTransfers_transfers_created_byTousersInput>, usersUncheckedUpdateWithoutTransfers_transfers_created_byTousersInput>
  }

  export type basesUpdateOneRequiredWithoutTransfers_transfers_from_base_idTobasesNestedInput = {
    create?: XOR<basesCreateWithoutTransfers_transfers_from_base_idTobasesInput, basesUncheckedCreateWithoutTransfers_transfers_from_base_idTobasesInput>
    connectOrCreate?: basesCreateOrConnectWithoutTransfers_transfers_from_base_idTobasesInput
    upsert?: basesUpsertWithoutTransfers_transfers_from_base_idTobasesInput
    connect?: basesWhereUniqueInput
    update?: XOR<XOR<basesUpdateToOneWithWhereWithoutTransfers_transfers_from_base_idTobasesInput, basesUpdateWithoutTransfers_transfers_from_base_idTobasesInput>, basesUncheckedUpdateWithoutTransfers_transfers_from_base_idTobasesInput>
  }

  export type basesUpdateOneRequiredWithoutTransfers_transfers_to_base_idTobasesNestedInput = {
    create?: XOR<basesCreateWithoutTransfers_transfers_to_base_idTobasesInput, basesUncheckedCreateWithoutTransfers_transfers_to_base_idTobasesInput>
    connectOrCreate?: basesCreateOrConnectWithoutTransfers_transfers_to_base_idTobasesInput
    upsert?: basesUpsertWithoutTransfers_transfers_to_base_idTobasesInput
    connect?: basesWhereUniqueInput
    update?: XOR<XOR<basesUpdateToOneWithWhereWithoutTransfers_transfers_to_base_idTobasesInput, basesUpdateWithoutTransfers_transfers_to_base_idTobasesInput>, basesUncheckedUpdateWithoutTransfers_transfers_to_base_idTobasesInput>
  }

  export type assignmentsCreateNestedManyWithoutUsersInput = {
    create?: XOR<assignmentsCreateWithoutUsersInput, assignmentsUncheckedCreateWithoutUsersInput> | assignmentsCreateWithoutUsersInput[] | assignmentsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: assignmentsCreateOrConnectWithoutUsersInput | assignmentsCreateOrConnectWithoutUsersInput[]
    createMany?: assignmentsCreateManyUsersInputEnvelope
    connect?: assignmentsWhereUniqueInput | assignmentsWhereUniqueInput[]
  }

  export type audit_logsCreateNestedManyWithoutUsersInput = {
    create?: XOR<audit_logsCreateWithoutUsersInput, audit_logsUncheckedCreateWithoutUsersInput> | audit_logsCreateWithoutUsersInput[] | audit_logsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: audit_logsCreateOrConnectWithoutUsersInput | audit_logsCreateOrConnectWithoutUsersInput[]
    createMany?: audit_logsCreateManyUsersInputEnvelope
    connect?: audit_logsWhereUniqueInput | audit_logsWhereUniqueInput[]
  }

  export type basesCreateNestedManyWithoutUsers_bases_commander_idTousersInput = {
    create?: XOR<basesCreateWithoutUsers_bases_commander_idTousersInput, basesUncheckedCreateWithoutUsers_bases_commander_idTousersInput> | basesCreateWithoutUsers_bases_commander_idTousersInput[] | basesUncheckedCreateWithoutUsers_bases_commander_idTousersInput[]
    connectOrCreate?: basesCreateOrConnectWithoutUsers_bases_commander_idTousersInput | basesCreateOrConnectWithoutUsers_bases_commander_idTousersInput[]
    createMany?: basesCreateManyUsers_bases_commander_idTousersInputEnvelope
    connect?: basesWhereUniqueInput | basesWhereUniqueInput[]
  }

  export type expendituresCreateNestedManyWithoutUsers_expenditures_authorized_byTousersInput = {
    create?: XOR<expendituresCreateWithoutUsers_expenditures_authorized_byTousersInput, expendituresUncheckedCreateWithoutUsers_expenditures_authorized_byTousersInput> | expendituresCreateWithoutUsers_expenditures_authorized_byTousersInput[] | expendituresUncheckedCreateWithoutUsers_expenditures_authorized_byTousersInput[]
    connectOrCreate?: expendituresCreateOrConnectWithoutUsers_expenditures_authorized_byTousersInput | expendituresCreateOrConnectWithoutUsers_expenditures_authorized_byTousersInput[]
    createMany?: expendituresCreateManyUsers_expenditures_authorized_byTousersInputEnvelope
    connect?: expendituresWhereUniqueInput | expendituresWhereUniqueInput[]
  }

  export type expendituresCreateNestedManyWithoutUsers_expenditures_created_byTousersInput = {
    create?: XOR<expendituresCreateWithoutUsers_expenditures_created_byTousersInput, expendituresUncheckedCreateWithoutUsers_expenditures_created_byTousersInput> | expendituresCreateWithoutUsers_expenditures_created_byTousersInput[] | expendituresUncheckedCreateWithoutUsers_expenditures_created_byTousersInput[]
    connectOrCreate?: expendituresCreateOrConnectWithoutUsers_expenditures_created_byTousersInput | expendituresCreateOrConnectWithoutUsers_expenditures_created_byTousersInput[]
    createMany?: expendituresCreateManyUsers_expenditures_created_byTousersInputEnvelope
    connect?: expendituresWhereUniqueInput | expendituresWhereUniqueInput[]
  }

  export type purchasesCreateNestedManyWithoutUsers_purchases_approved_byTousersInput = {
    create?: XOR<purchasesCreateWithoutUsers_purchases_approved_byTousersInput, purchasesUncheckedCreateWithoutUsers_purchases_approved_byTousersInput> | purchasesCreateWithoutUsers_purchases_approved_byTousersInput[] | purchasesUncheckedCreateWithoutUsers_purchases_approved_byTousersInput[]
    connectOrCreate?: purchasesCreateOrConnectWithoutUsers_purchases_approved_byTousersInput | purchasesCreateOrConnectWithoutUsers_purchases_approved_byTousersInput[]
    createMany?: purchasesCreateManyUsers_purchases_approved_byTousersInputEnvelope
    connect?: purchasesWhereUniqueInput | purchasesWhereUniqueInput[]
  }

  export type purchasesCreateNestedManyWithoutUsers_purchases_created_byTousersInput = {
    create?: XOR<purchasesCreateWithoutUsers_purchases_created_byTousersInput, purchasesUncheckedCreateWithoutUsers_purchases_created_byTousersInput> | purchasesCreateWithoutUsers_purchases_created_byTousersInput[] | purchasesUncheckedCreateWithoutUsers_purchases_created_byTousersInput[]
    connectOrCreate?: purchasesCreateOrConnectWithoutUsers_purchases_created_byTousersInput | purchasesCreateOrConnectWithoutUsers_purchases_created_byTousersInput[]
    createMany?: purchasesCreateManyUsers_purchases_created_byTousersInputEnvelope
    connect?: purchasesWhereUniqueInput | purchasesWhereUniqueInput[]
  }

  export type transfersCreateNestedManyWithoutUsers_transfers_approved_byTousersInput = {
    create?: XOR<transfersCreateWithoutUsers_transfers_approved_byTousersInput, transfersUncheckedCreateWithoutUsers_transfers_approved_byTousersInput> | transfersCreateWithoutUsers_transfers_approved_byTousersInput[] | transfersUncheckedCreateWithoutUsers_transfers_approved_byTousersInput[]
    connectOrCreate?: transfersCreateOrConnectWithoutUsers_transfers_approved_byTousersInput | transfersCreateOrConnectWithoutUsers_transfers_approved_byTousersInput[]
    createMany?: transfersCreateManyUsers_transfers_approved_byTousersInputEnvelope
    connect?: transfersWhereUniqueInput | transfersWhereUniqueInput[]
  }

  export type transfersCreateNestedManyWithoutUsers_transfers_created_byTousersInput = {
    create?: XOR<transfersCreateWithoutUsers_transfers_created_byTousersInput, transfersUncheckedCreateWithoutUsers_transfers_created_byTousersInput> | transfersCreateWithoutUsers_transfers_created_byTousersInput[] | transfersUncheckedCreateWithoutUsers_transfers_created_byTousersInput[]
    connectOrCreate?: transfersCreateOrConnectWithoutUsers_transfers_created_byTousersInput | transfersCreateOrConnectWithoutUsers_transfers_created_byTousersInput[]
    createMany?: transfersCreateManyUsers_transfers_created_byTousersInputEnvelope
    connect?: transfersWhereUniqueInput | transfersWhereUniqueInput[]
  }

  export type basesCreateNestedOneWithoutUsers_users_base_idTobasesInput = {
    create?: XOR<basesCreateWithoutUsers_users_base_idTobasesInput, basesUncheckedCreateWithoutUsers_users_base_idTobasesInput>
    connectOrCreate?: basesCreateOrConnectWithoutUsers_users_base_idTobasesInput
    connect?: basesWhereUniqueInput
  }

  export type assignmentsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<assignmentsCreateWithoutUsersInput, assignmentsUncheckedCreateWithoutUsersInput> | assignmentsCreateWithoutUsersInput[] | assignmentsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: assignmentsCreateOrConnectWithoutUsersInput | assignmentsCreateOrConnectWithoutUsersInput[]
    createMany?: assignmentsCreateManyUsersInputEnvelope
    connect?: assignmentsWhereUniqueInput | assignmentsWhereUniqueInput[]
  }

  export type audit_logsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<audit_logsCreateWithoutUsersInput, audit_logsUncheckedCreateWithoutUsersInput> | audit_logsCreateWithoutUsersInput[] | audit_logsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: audit_logsCreateOrConnectWithoutUsersInput | audit_logsCreateOrConnectWithoutUsersInput[]
    createMany?: audit_logsCreateManyUsersInputEnvelope
    connect?: audit_logsWhereUniqueInput | audit_logsWhereUniqueInput[]
  }

  export type basesUncheckedCreateNestedManyWithoutUsers_bases_commander_idTousersInput = {
    create?: XOR<basesCreateWithoutUsers_bases_commander_idTousersInput, basesUncheckedCreateWithoutUsers_bases_commander_idTousersInput> | basesCreateWithoutUsers_bases_commander_idTousersInput[] | basesUncheckedCreateWithoutUsers_bases_commander_idTousersInput[]
    connectOrCreate?: basesCreateOrConnectWithoutUsers_bases_commander_idTousersInput | basesCreateOrConnectWithoutUsers_bases_commander_idTousersInput[]
    createMany?: basesCreateManyUsers_bases_commander_idTousersInputEnvelope
    connect?: basesWhereUniqueInput | basesWhereUniqueInput[]
  }

  export type expendituresUncheckedCreateNestedManyWithoutUsers_expenditures_authorized_byTousersInput = {
    create?: XOR<expendituresCreateWithoutUsers_expenditures_authorized_byTousersInput, expendituresUncheckedCreateWithoutUsers_expenditures_authorized_byTousersInput> | expendituresCreateWithoutUsers_expenditures_authorized_byTousersInput[] | expendituresUncheckedCreateWithoutUsers_expenditures_authorized_byTousersInput[]
    connectOrCreate?: expendituresCreateOrConnectWithoutUsers_expenditures_authorized_byTousersInput | expendituresCreateOrConnectWithoutUsers_expenditures_authorized_byTousersInput[]
    createMany?: expendituresCreateManyUsers_expenditures_authorized_byTousersInputEnvelope
    connect?: expendituresWhereUniqueInput | expendituresWhereUniqueInput[]
  }

  export type expendituresUncheckedCreateNestedManyWithoutUsers_expenditures_created_byTousersInput = {
    create?: XOR<expendituresCreateWithoutUsers_expenditures_created_byTousersInput, expendituresUncheckedCreateWithoutUsers_expenditures_created_byTousersInput> | expendituresCreateWithoutUsers_expenditures_created_byTousersInput[] | expendituresUncheckedCreateWithoutUsers_expenditures_created_byTousersInput[]
    connectOrCreate?: expendituresCreateOrConnectWithoutUsers_expenditures_created_byTousersInput | expendituresCreateOrConnectWithoutUsers_expenditures_created_byTousersInput[]
    createMany?: expendituresCreateManyUsers_expenditures_created_byTousersInputEnvelope
    connect?: expendituresWhereUniqueInput | expendituresWhereUniqueInput[]
  }

  export type purchasesUncheckedCreateNestedManyWithoutUsers_purchases_approved_byTousersInput = {
    create?: XOR<purchasesCreateWithoutUsers_purchases_approved_byTousersInput, purchasesUncheckedCreateWithoutUsers_purchases_approved_byTousersInput> | purchasesCreateWithoutUsers_purchases_approved_byTousersInput[] | purchasesUncheckedCreateWithoutUsers_purchases_approved_byTousersInput[]
    connectOrCreate?: purchasesCreateOrConnectWithoutUsers_purchases_approved_byTousersInput | purchasesCreateOrConnectWithoutUsers_purchases_approved_byTousersInput[]
    createMany?: purchasesCreateManyUsers_purchases_approved_byTousersInputEnvelope
    connect?: purchasesWhereUniqueInput | purchasesWhereUniqueInput[]
  }

  export type purchasesUncheckedCreateNestedManyWithoutUsers_purchases_created_byTousersInput = {
    create?: XOR<purchasesCreateWithoutUsers_purchases_created_byTousersInput, purchasesUncheckedCreateWithoutUsers_purchases_created_byTousersInput> | purchasesCreateWithoutUsers_purchases_created_byTousersInput[] | purchasesUncheckedCreateWithoutUsers_purchases_created_byTousersInput[]
    connectOrCreate?: purchasesCreateOrConnectWithoutUsers_purchases_created_byTousersInput | purchasesCreateOrConnectWithoutUsers_purchases_created_byTousersInput[]
    createMany?: purchasesCreateManyUsers_purchases_created_byTousersInputEnvelope
    connect?: purchasesWhereUniqueInput | purchasesWhereUniqueInput[]
  }

  export type transfersUncheckedCreateNestedManyWithoutUsers_transfers_approved_byTousersInput = {
    create?: XOR<transfersCreateWithoutUsers_transfers_approved_byTousersInput, transfersUncheckedCreateWithoutUsers_transfers_approved_byTousersInput> | transfersCreateWithoutUsers_transfers_approved_byTousersInput[] | transfersUncheckedCreateWithoutUsers_transfers_approved_byTousersInput[]
    connectOrCreate?: transfersCreateOrConnectWithoutUsers_transfers_approved_byTousersInput | transfersCreateOrConnectWithoutUsers_transfers_approved_byTousersInput[]
    createMany?: transfersCreateManyUsers_transfers_approved_byTousersInputEnvelope
    connect?: transfersWhereUniqueInput | transfersWhereUniqueInput[]
  }

  export type transfersUncheckedCreateNestedManyWithoutUsers_transfers_created_byTousersInput = {
    create?: XOR<transfersCreateWithoutUsers_transfers_created_byTousersInput, transfersUncheckedCreateWithoutUsers_transfers_created_byTousersInput> | transfersCreateWithoutUsers_transfers_created_byTousersInput[] | transfersUncheckedCreateWithoutUsers_transfers_created_byTousersInput[]
    connectOrCreate?: transfersCreateOrConnectWithoutUsers_transfers_created_byTousersInput | transfersCreateOrConnectWithoutUsers_transfers_created_byTousersInput[]
    createMany?: transfersCreateManyUsers_transfers_created_byTousersInputEnvelope
    connect?: transfersWhereUniqueInput | transfersWhereUniqueInput[]
  }

  export type assignmentsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<assignmentsCreateWithoutUsersInput, assignmentsUncheckedCreateWithoutUsersInput> | assignmentsCreateWithoutUsersInput[] | assignmentsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: assignmentsCreateOrConnectWithoutUsersInput | assignmentsCreateOrConnectWithoutUsersInput[]
    upsert?: assignmentsUpsertWithWhereUniqueWithoutUsersInput | assignmentsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: assignmentsCreateManyUsersInputEnvelope
    set?: assignmentsWhereUniqueInput | assignmentsWhereUniqueInput[]
    disconnect?: assignmentsWhereUniqueInput | assignmentsWhereUniqueInput[]
    delete?: assignmentsWhereUniqueInput | assignmentsWhereUniqueInput[]
    connect?: assignmentsWhereUniqueInput | assignmentsWhereUniqueInput[]
    update?: assignmentsUpdateWithWhereUniqueWithoutUsersInput | assignmentsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: assignmentsUpdateManyWithWhereWithoutUsersInput | assignmentsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: assignmentsScalarWhereInput | assignmentsScalarWhereInput[]
  }

  export type audit_logsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<audit_logsCreateWithoutUsersInput, audit_logsUncheckedCreateWithoutUsersInput> | audit_logsCreateWithoutUsersInput[] | audit_logsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: audit_logsCreateOrConnectWithoutUsersInput | audit_logsCreateOrConnectWithoutUsersInput[]
    upsert?: audit_logsUpsertWithWhereUniqueWithoutUsersInput | audit_logsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: audit_logsCreateManyUsersInputEnvelope
    set?: audit_logsWhereUniqueInput | audit_logsWhereUniqueInput[]
    disconnect?: audit_logsWhereUniqueInput | audit_logsWhereUniqueInput[]
    delete?: audit_logsWhereUniqueInput | audit_logsWhereUniqueInput[]
    connect?: audit_logsWhereUniqueInput | audit_logsWhereUniqueInput[]
    update?: audit_logsUpdateWithWhereUniqueWithoutUsersInput | audit_logsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: audit_logsUpdateManyWithWhereWithoutUsersInput | audit_logsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: audit_logsScalarWhereInput | audit_logsScalarWhereInput[]
  }

  export type basesUpdateManyWithoutUsers_bases_commander_idTousersNestedInput = {
    create?: XOR<basesCreateWithoutUsers_bases_commander_idTousersInput, basesUncheckedCreateWithoutUsers_bases_commander_idTousersInput> | basesCreateWithoutUsers_bases_commander_idTousersInput[] | basesUncheckedCreateWithoutUsers_bases_commander_idTousersInput[]
    connectOrCreate?: basesCreateOrConnectWithoutUsers_bases_commander_idTousersInput | basesCreateOrConnectWithoutUsers_bases_commander_idTousersInput[]
    upsert?: basesUpsertWithWhereUniqueWithoutUsers_bases_commander_idTousersInput | basesUpsertWithWhereUniqueWithoutUsers_bases_commander_idTousersInput[]
    createMany?: basesCreateManyUsers_bases_commander_idTousersInputEnvelope
    set?: basesWhereUniqueInput | basesWhereUniqueInput[]
    disconnect?: basesWhereUniqueInput | basesWhereUniqueInput[]
    delete?: basesWhereUniqueInput | basesWhereUniqueInput[]
    connect?: basesWhereUniqueInput | basesWhereUniqueInput[]
    update?: basesUpdateWithWhereUniqueWithoutUsers_bases_commander_idTousersInput | basesUpdateWithWhereUniqueWithoutUsers_bases_commander_idTousersInput[]
    updateMany?: basesUpdateManyWithWhereWithoutUsers_bases_commander_idTousersInput | basesUpdateManyWithWhereWithoutUsers_bases_commander_idTousersInput[]
    deleteMany?: basesScalarWhereInput | basesScalarWhereInput[]
  }

  export type expendituresUpdateManyWithoutUsers_expenditures_authorized_byTousersNestedInput = {
    create?: XOR<expendituresCreateWithoutUsers_expenditures_authorized_byTousersInput, expendituresUncheckedCreateWithoutUsers_expenditures_authorized_byTousersInput> | expendituresCreateWithoutUsers_expenditures_authorized_byTousersInput[] | expendituresUncheckedCreateWithoutUsers_expenditures_authorized_byTousersInput[]
    connectOrCreate?: expendituresCreateOrConnectWithoutUsers_expenditures_authorized_byTousersInput | expendituresCreateOrConnectWithoutUsers_expenditures_authorized_byTousersInput[]
    upsert?: expendituresUpsertWithWhereUniqueWithoutUsers_expenditures_authorized_byTousersInput | expendituresUpsertWithWhereUniqueWithoutUsers_expenditures_authorized_byTousersInput[]
    createMany?: expendituresCreateManyUsers_expenditures_authorized_byTousersInputEnvelope
    set?: expendituresWhereUniqueInput | expendituresWhereUniqueInput[]
    disconnect?: expendituresWhereUniqueInput | expendituresWhereUniqueInput[]
    delete?: expendituresWhereUniqueInput | expendituresWhereUniqueInput[]
    connect?: expendituresWhereUniqueInput | expendituresWhereUniqueInput[]
    update?: expendituresUpdateWithWhereUniqueWithoutUsers_expenditures_authorized_byTousersInput | expendituresUpdateWithWhereUniqueWithoutUsers_expenditures_authorized_byTousersInput[]
    updateMany?: expendituresUpdateManyWithWhereWithoutUsers_expenditures_authorized_byTousersInput | expendituresUpdateManyWithWhereWithoutUsers_expenditures_authorized_byTousersInput[]
    deleteMany?: expendituresScalarWhereInput | expendituresScalarWhereInput[]
  }

  export type expendituresUpdateManyWithoutUsers_expenditures_created_byTousersNestedInput = {
    create?: XOR<expendituresCreateWithoutUsers_expenditures_created_byTousersInput, expendituresUncheckedCreateWithoutUsers_expenditures_created_byTousersInput> | expendituresCreateWithoutUsers_expenditures_created_byTousersInput[] | expendituresUncheckedCreateWithoutUsers_expenditures_created_byTousersInput[]
    connectOrCreate?: expendituresCreateOrConnectWithoutUsers_expenditures_created_byTousersInput | expendituresCreateOrConnectWithoutUsers_expenditures_created_byTousersInput[]
    upsert?: expendituresUpsertWithWhereUniqueWithoutUsers_expenditures_created_byTousersInput | expendituresUpsertWithWhereUniqueWithoutUsers_expenditures_created_byTousersInput[]
    createMany?: expendituresCreateManyUsers_expenditures_created_byTousersInputEnvelope
    set?: expendituresWhereUniqueInput | expendituresWhereUniqueInput[]
    disconnect?: expendituresWhereUniqueInput | expendituresWhereUniqueInput[]
    delete?: expendituresWhereUniqueInput | expendituresWhereUniqueInput[]
    connect?: expendituresWhereUniqueInput | expendituresWhereUniqueInput[]
    update?: expendituresUpdateWithWhereUniqueWithoutUsers_expenditures_created_byTousersInput | expendituresUpdateWithWhereUniqueWithoutUsers_expenditures_created_byTousersInput[]
    updateMany?: expendituresUpdateManyWithWhereWithoutUsers_expenditures_created_byTousersInput | expendituresUpdateManyWithWhereWithoutUsers_expenditures_created_byTousersInput[]
    deleteMany?: expendituresScalarWhereInput | expendituresScalarWhereInput[]
  }

  export type purchasesUpdateManyWithoutUsers_purchases_approved_byTousersNestedInput = {
    create?: XOR<purchasesCreateWithoutUsers_purchases_approved_byTousersInput, purchasesUncheckedCreateWithoutUsers_purchases_approved_byTousersInput> | purchasesCreateWithoutUsers_purchases_approved_byTousersInput[] | purchasesUncheckedCreateWithoutUsers_purchases_approved_byTousersInput[]
    connectOrCreate?: purchasesCreateOrConnectWithoutUsers_purchases_approved_byTousersInput | purchasesCreateOrConnectWithoutUsers_purchases_approved_byTousersInput[]
    upsert?: purchasesUpsertWithWhereUniqueWithoutUsers_purchases_approved_byTousersInput | purchasesUpsertWithWhereUniqueWithoutUsers_purchases_approved_byTousersInput[]
    createMany?: purchasesCreateManyUsers_purchases_approved_byTousersInputEnvelope
    set?: purchasesWhereUniqueInput | purchasesWhereUniqueInput[]
    disconnect?: purchasesWhereUniqueInput | purchasesWhereUniqueInput[]
    delete?: purchasesWhereUniqueInput | purchasesWhereUniqueInput[]
    connect?: purchasesWhereUniqueInput | purchasesWhereUniqueInput[]
    update?: purchasesUpdateWithWhereUniqueWithoutUsers_purchases_approved_byTousersInput | purchasesUpdateWithWhereUniqueWithoutUsers_purchases_approved_byTousersInput[]
    updateMany?: purchasesUpdateManyWithWhereWithoutUsers_purchases_approved_byTousersInput | purchasesUpdateManyWithWhereWithoutUsers_purchases_approved_byTousersInput[]
    deleteMany?: purchasesScalarWhereInput | purchasesScalarWhereInput[]
  }

  export type purchasesUpdateManyWithoutUsers_purchases_created_byTousersNestedInput = {
    create?: XOR<purchasesCreateWithoutUsers_purchases_created_byTousersInput, purchasesUncheckedCreateWithoutUsers_purchases_created_byTousersInput> | purchasesCreateWithoutUsers_purchases_created_byTousersInput[] | purchasesUncheckedCreateWithoutUsers_purchases_created_byTousersInput[]
    connectOrCreate?: purchasesCreateOrConnectWithoutUsers_purchases_created_byTousersInput | purchasesCreateOrConnectWithoutUsers_purchases_created_byTousersInput[]
    upsert?: purchasesUpsertWithWhereUniqueWithoutUsers_purchases_created_byTousersInput | purchasesUpsertWithWhereUniqueWithoutUsers_purchases_created_byTousersInput[]
    createMany?: purchasesCreateManyUsers_purchases_created_byTousersInputEnvelope
    set?: purchasesWhereUniqueInput | purchasesWhereUniqueInput[]
    disconnect?: purchasesWhereUniqueInput | purchasesWhereUniqueInput[]
    delete?: purchasesWhereUniqueInput | purchasesWhereUniqueInput[]
    connect?: purchasesWhereUniqueInput | purchasesWhereUniqueInput[]
    update?: purchasesUpdateWithWhereUniqueWithoutUsers_purchases_created_byTousersInput | purchasesUpdateWithWhereUniqueWithoutUsers_purchases_created_byTousersInput[]
    updateMany?: purchasesUpdateManyWithWhereWithoutUsers_purchases_created_byTousersInput | purchasesUpdateManyWithWhereWithoutUsers_purchases_created_byTousersInput[]
    deleteMany?: purchasesScalarWhereInput | purchasesScalarWhereInput[]
  }

  export type transfersUpdateManyWithoutUsers_transfers_approved_byTousersNestedInput = {
    create?: XOR<transfersCreateWithoutUsers_transfers_approved_byTousersInput, transfersUncheckedCreateWithoutUsers_transfers_approved_byTousersInput> | transfersCreateWithoutUsers_transfers_approved_byTousersInput[] | transfersUncheckedCreateWithoutUsers_transfers_approved_byTousersInput[]
    connectOrCreate?: transfersCreateOrConnectWithoutUsers_transfers_approved_byTousersInput | transfersCreateOrConnectWithoutUsers_transfers_approved_byTousersInput[]
    upsert?: transfersUpsertWithWhereUniqueWithoutUsers_transfers_approved_byTousersInput | transfersUpsertWithWhereUniqueWithoutUsers_transfers_approved_byTousersInput[]
    createMany?: transfersCreateManyUsers_transfers_approved_byTousersInputEnvelope
    set?: transfersWhereUniqueInput | transfersWhereUniqueInput[]
    disconnect?: transfersWhereUniqueInput | transfersWhereUniqueInput[]
    delete?: transfersWhereUniqueInput | transfersWhereUniqueInput[]
    connect?: transfersWhereUniqueInput | transfersWhereUniqueInput[]
    update?: transfersUpdateWithWhereUniqueWithoutUsers_transfers_approved_byTousersInput | transfersUpdateWithWhereUniqueWithoutUsers_transfers_approved_byTousersInput[]
    updateMany?: transfersUpdateManyWithWhereWithoutUsers_transfers_approved_byTousersInput | transfersUpdateManyWithWhereWithoutUsers_transfers_approved_byTousersInput[]
    deleteMany?: transfersScalarWhereInput | transfersScalarWhereInput[]
  }

  export type transfersUpdateManyWithoutUsers_transfers_created_byTousersNestedInput = {
    create?: XOR<transfersCreateWithoutUsers_transfers_created_byTousersInput, transfersUncheckedCreateWithoutUsers_transfers_created_byTousersInput> | transfersCreateWithoutUsers_transfers_created_byTousersInput[] | transfersUncheckedCreateWithoutUsers_transfers_created_byTousersInput[]
    connectOrCreate?: transfersCreateOrConnectWithoutUsers_transfers_created_byTousersInput | transfersCreateOrConnectWithoutUsers_transfers_created_byTousersInput[]
    upsert?: transfersUpsertWithWhereUniqueWithoutUsers_transfers_created_byTousersInput | transfersUpsertWithWhereUniqueWithoutUsers_transfers_created_byTousersInput[]
    createMany?: transfersCreateManyUsers_transfers_created_byTousersInputEnvelope
    set?: transfersWhereUniqueInput | transfersWhereUniqueInput[]
    disconnect?: transfersWhereUniqueInput | transfersWhereUniqueInput[]
    delete?: transfersWhereUniqueInput | transfersWhereUniqueInput[]
    connect?: transfersWhereUniqueInput | transfersWhereUniqueInput[]
    update?: transfersUpdateWithWhereUniqueWithoutUsers_transfers_created_byTousersInput | transfersUpdateWithWhereUniqueWithoutUsers_transfers_created_byTousersInput[]
    updateMany?: transfersUpdateManyWithWhereWithoutUsers_transfers_created_byTousersInput | transfersUpdateManyWithWhereWithoutUsers_transfers_created_byTousersInput[]
    deleteMany?: transfersScalarWhereInput | transfersScalarWhereInput[]
  }

  export type basesUpdateOneWithoutUsers_users_base_idTobasesNestedInput = {
    create?: XOR<basesCreateWithoutUsers_users_base_idTobasesInput, basesUncheckedCreateWithoutUsers_users_base_idTobasesInput>
    connectOrCreate?: basesCreateOrConnectWithoutUsers_users_base_idTobasesInput
    upsert?: basesUpsertWithoutUsers_users_base_idTobasesInput
    disconnect?: basesWhereInput | boolean
    delete?: basesWhereInput | boolean
    connect?: basesWhereUniqueInput
    update?: XOR<XOR<basesUpdateToOneWithWhereWithoutUsers_users_base_idTobasesInput, basesUpdateWithoutUsers_users_base_idTobasesInput>, basesUncheckedUpdateWithoutUsers_users_base_idTobasesInput>
  }

  export type assignmentsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<assignmentsCreateWithoutUsersInput, assignmentsUncheckedCreateWithoutUsersInput> | assignmentsCreateWithoutUsersInput[] | assignmentsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: assignmentsCreateOrConnectWithoutUsersInput | assignmentsCreateOrConnectWithoutUsersInput[]
    upsert?: assignmentsUpsertWithWhereUniqueWithoutUsersInput | assignmentsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: assignmentsCreateManyUsersInputEnvelope
    set?: assignmentsWhereUniqueInput | assignmentsWhereUniqueInput[]
    disconnect?: assignmentsWhereUniqueInput | assignmentsWhereUniqueInput[]
    delete?: assignmentsWhereUniqueInput | assignmentsWhereUniqueInput[]
    connect?: assignmentsWhereUniqueInput | assignmentsWhereUniqueInput[]
    update?: assignmentsUpdateWithWhereUniqueWithoutUsersInput | assignmentsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: assignmentsUpdateManyWithWhereWithoutUsersInput | assignmentsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: assignmentsScalarWhereInput | assignmentsScalarWhereInput[]
  }

  export type audit_logsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<audit_logsCreateWithoutUsersInput, audit_logsUncheckedCreateWithoutUsersInput> | audit_logsCreateWithoutUsersInput[] | audit_logsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: audit_logsCreateOrConnectWithoutUsersInput | audit_logsCreateOrConnectWithoutUsersInput[]
    upsert?: audit_logsUpsertWithWhereUniqueWithoutUsersInput | audit_logsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: audit_logsCreateManyUsersInputEnvelope
    set?: audit_logsWhereUniqueInput | audit_logsWhereUniqueInput[]
    disconnect?: audit_logsWhereUniqueInput | audit_logsWhereUniqueInput[]
    delete?: audit_logsWhereUniqueInput | audit_logsWhereUniqueInput[]
    connect?: audit_logsWhereUniqueInput | audit_logsWhereUniqueInput[]
    update?: audit_logsUpdateWithWhereUniqueWithoutUsersInput | audit_logsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: audit_logsUpdateManyWithWhereWithoutUsersInput | audit_logsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: audit_logsScalarWhereInput | audit_logsScalarWhereInput[]
  }

  export type basesUncheckedUpdateManyWithoutUsers_bases_commander_idTousersNestedInput = {
    create?: XOR<basesCreateWithoutUsers_bases_commander_idTousersInput, basesUncheckedCreateWithoutUsers_bases_commander_idTousersInput> | basesCreateWithoutUsers_bases_commander_idTousersInput[] | basesUncheckedCreateWithoutUsers_bases_commander_idTousersInput[]
    connectOrCreate?: basesCreateOrConnectWithoutUsers_bases_commander_idTousersInput | basesCreateOrConnectWithoutUsers_bases_commander_idTousersInput[]
    upsert?: basesUpsertWithWhereUniqueWithoutUsers_bases_commander_idTousersInput | basesUpsertWithWhereUniqueWithoutUsers_bases_commander_idTousersInput[]
    createMany?: basesCreateManyUsers_bases_commander_idTousersInputEnvelope
    set?: basesWhereUniqueInput | basesWhereUniqueInput[]
    disconnect?: basesWhereUniqueInput | basesWhereUniqueInput[]
    delete?: basesWhereUniqueInput | basesWhereUniqueInput[]
    connect?: basesWhereUniqueInput | basesWhereUniqueInput[]
    update?: basesUpdateWithWhereUniqueWithoutUsers_bases_commander_idTousersInput | basesUpdateWithWhereUniqueWithoutUsers_bases_commander_idTousersInput[]
    updateMany?: basesUpdateManyWithWhereWithoutUsers_bases_commander_idTousersInput | basesUpdateManyWithWhereWithoutUsers_bases_commander_idTousersInput[]
    deleteMany?: basesScalarWhereInput | basesScalarWhereInput[]
  }

  export type expendituresUncheckedUpdateManyWithoutUsers_expenditures_authorized_byTousersNestedInput = {
    create?: XOR<expendituresCreateWithoutUsers_expenditures_authorized_byTousersInput, expendituresUncheckedCreateWithoutUsers_expenditures_authorized_byTousersInput> | expendituresCreateWithoutUsers_expenditures_authorized_byTousersInput[] | expendituresUncheckedCreateWithoutUsers_expenditures_authorized_byTousersInput[]
    connectOrCreate?: expendituresCreateOrConnectWithoutUsers_expenditures_authorized_byTousersInput | expendituresCreateOrConnectWithoutUsers_expenditures_authorized_byTousersInput[]
    upsert?: expendituresUpsertWithWhereUniqueWithoutUsers_expenditures_authorized_byTousersInput | expendituresUpsertWithWhereUniqueWithoutUsers_expenditures_authorized_byTousersInput[]
    createMany?: expendituresCreateManyUsers_expenditures_authorized_byTousersInputEnvelope
    set?: expendituresWhereUniqueInput | expendituresWhereUniqueInput[]
    disconnect?: expendituresWhereUniqueInput | expendituresWhereUniqueInput[]
    delete?: expendituresWhereUniqueInput | expendituresWhereUniqueInput[]
    connect?: expendituresWhereUniqueInput | expendituresWhereUniqueInput[]
    update?: expendituresUpdateWithWhereUniqueWithoutUsers_expenditures_authorized_byTousersInput | expendituresUpdateWithWhereUniqueWithoutUsers_expenditures_authorized_byTousersInput[]
    updateMany?: expendituresUpdateManyWithWhereWithoutUsers_expenditures_authorized_byTousersInput | expendituresUpdateManyWithWhereWithoutUsers_expenditures_authorized_byTousersInput[]
    deleteMany?: expendituresScalarWhereInput | expendituresScalarWhereInput[]
  }

  export type expendituresUncheckedUpdateManyWithoutUsers_expenditures_created_byTousersNestedInput = {
    create?: XOR<expendituresCreateWithoutUsers_expenditures_created_byTousersInput, expendituresUncheckedCreateWithoutUsers_expenditures_created_byTousersInput> | expendituresCreateWithoutUsers_expenditures_created_byTousersInput[] | expendituresUncheckedCreateWithoutUsers_expenditures_created_byTousersInput[]
    connectOrCreate?: expendituresCreateOrConnectWithoutUsers_expenditures_created_byTousersInput | expendituresCreateOrConnectWithoutUsers_expenditures_created_byTousersInput[]
    upsert?: expendituresUpsertWithWhereUniqueWithoutUsers_expenditures_created_byTousersInput | expendituresUpsertWithWhereUniqueWithoutUsers_expenditures_created_byTousersInput[]
    createMany?: expendituresCreateManyUsers_expenditures_created_byTousersInputEnvelope
    set?: expendituresWhereUniqueInput | expendituresWhereUniqueInput[]
    disconnect?: expendituresWhereUniqueInput | expendituresWhereUniqueInput[]
    delete?: expendituresWhereUniqueInput | expendituresWhereUniqueInput[]
    connect?: expendituresWhereUniqueInput | expendituresWhereUniqueInput[]
    update?: expendituresUpdateWithWhereUniqueWithoutUsers_expenditures_created_byTousersInput | expendituresUpdateWithWhereUniqueWithoutUsers_expenditures_created_byTousersInput[]
    updateMany?: expendituresUpdateManyWithWhereWithoutUsers_expenditures_created_byTousersInput | expendituresUpdateManyWithWhereWithoutUsers_expenditures_created_byTousersInput[]
    deleteMany?: expendituresScalarWhereInput | expendituresScalarWhereInput[]
  }

  export type purchasesUncheckedUpdateManyWithoutUsers_purchases_approved_byTousersNestedInput = {
    create?: XOR<purchasesCreateWithoutUsers_purchases_approved_byTousersInput, purchasesUncheckedCreateWithoutUsers_purchases_approved_byTousersInput> | purchasesCreateWithoutUsers_purchases_approved_byTousersInput[] | purchasesUncheckedCreateWithoutUsers_purchases_approved_byTousersInput[]
    connectOrCreate?: purchasesCreateOrConnectWithoutUsers_purchases_approved_byTousersInput | purchasesCreateOrConnectWithoutUsers_purchases_approved_byTousersInput[]
    upsert?: purchasesUpsertWithWhereUniqueWithoutUsers_purchases_approved_byTousersInput | purchasesUpsertWithWhereUniqueWithoutUsers_purchases_approved_byTousersInput[]
    createMany?: purchasesCreateManyUsers_purchases_approved_byTousersInputEnvelope
    set?: purchasesWhereUniqueInput | purchasesWhereUniqueInput[]
    disconnect?: purchasesWhereUniqueInput | purchasesWhereUniqueInput[]
    delete?: purchasesWhereUniqueInput | purchasesWhereUniqueInput[]
    connect?: purchasesWhereUniqueInput | purchasesWhereUniqueInput[]
    update?: purchasesUpdateWithWhereUniqueWithoutUsers_purchases_approved_byTousersInput | purchasesUpdateWithWhereUniqueWithoutUsers_purchases_approved_byTousersInput[]
    updateMany?: purchasesUpdateManyWithWhereWithoutUsers_purchases_approved_byTousersInput | purchasesUpdateManyWithWhereWithoutUsers_purchases_approved_byTousersInput[]
    deleteMany?: purchasesScalarWhereInput | purchasesScalarWhereInput[]
  }

  export type purchasesUncheckedUpdateManyWithoutUsers_purchases_created_byTousersNestedInput = {
    create?: XOR<purchasesCreateWithoutUsers_purchases_created_byTousersInput, purchasesUncheckedCreateWithoutUsers_purchases_created_byTousersInput> | purchasesCreateWithoutUsers_purchases_created_byTousersInput[] | purchasesUncheckedCreateWithoutUsers_purchases_created_byTousersInput[]
    connectOrCreate?: purchasesCreateOrConnectWithoutUsers_purchases_created_byTousersInput | purchasesCreateOrConnectWithoutUsers_purchases_created_byTousersInput[]
    upsert?: purchasesUpsertWithWhereUniqueWithoutUsers_purchases_created_byTousersInput | purchasesUpsertWithWhereUniqueWithoutUsers_purchases_created_byTousersInput[]
    createMany?: purchasesCreateManyUsers_purchases_created_byTousersInputEnvelope
    set?: purchasesWhereUniqueInput | purchasesWhereUniqueInput[]
    disconnect?: purchasesWhereUniqueInput | purchasesWhereUniqueInput[]
    delete?: purchasesWhereUniqueInput | purchasesWhereUniqueInput[]
    connect?: purchasesWhereUniqueInput | purchasesWhereUniqueInput[]
    update?: purchasesUpdateWithWhereUniqueWithoutUsers_purchases_created_byTousersInput | purchasesUpdateWithWhereUniqueWithoutUsers_purchases_created_byTousersInput[]
    updateMany?: purchasesUpdateManyWithWhereWithoutUsers_purchases_created_byTousersInput | purchasesUpdateManyWithWhereWithoutUsers_purchases_created_byTousersInput[]
    deleteMany?: purchasesScalarWhereInput | purchasesScalarWhereInput[]
  }

  export type transfersUncheckedUpdateManyWithoutUsers_transfers_approved_byTousersNestedInput = {
    create?: XOR<transfersCreateWithoutUsers_transfers_approved_byTousersInput, transfersUncheckedCreateWithoutUsers_transfers_approved_byTousersInput> | transfersCreateWithoutUsers_transfers_approved_byTousersInput[] | transfersUncheckedCreateWithoutUsers_transfers_approved_byTousersInput[]
    connectOrCreate?: transfersCreateOrConnectWithoutUsers_transfers_approved_byTousersInput | transfersCreateOrConnectWithoutUsers_transfers_approved_byTousersInput[]
    upsert?: transfersUpsertWithWhereUniqueWithoutUsers_transfers_approved_byTousersInput | transfersUpsertWithWhereUniqueWithoutUsers_transfers_approved_byTousersInput[]
    createMany?: transfersCreateManyUsers_transfers_approved_byTousersInputEnvelope
    set?: transfersWhereUniqueInput | transfersWhereUniqueInput[]
    disconnect?: transfersWhereUniqueInput | transfersWhereUniqueInput[]
    delete?: transfersWhereUniqueInput | transfersWhereUniqueInput[]
    connect?: transfersWhereUniqueInput | transfersWhereUniqueInput[]
    update?: transfersUpdateWithWhereUniqueWithoutUsers_transfers_approved_byTousersInput | transfersUpdateWithWhereUniqueWithoutUsers_transfers_approved_byTousersInput[]
    updateMany?: transfersUpdateManyWithWhereWithoutUsers_transfers_approved_byTousersInput | transfersUpdateManyWithWhereWithoutUsers_transfers_approved_byTousersInput[]
    deleteMany?: transfersScalarWhereInput | transfersScalarWhereInput[]
  }

  export type transfersUncheckedUpdateManyWithoutUsers_transfers_created_byTousersNestedInput = {
    create?: XOR<transfersCreateWithoutUsers_transfers_created_byTousersInput, transfersUncheckedCreateWithoutUsers_transfers_created_byTousersInput> | transfersCreateWithoutUsers_transfers_created_byTousersInput[] | transfersUncheckedCreateWithoutUsers_transfers_created_byTousersInput[]
    connectOrCreate?: transfersCreateOrConnectWithoutUsers_transfers_created_byTousersInput | transfersCreateOrConnectWithoutUsers_transfers_created_byTousersInput[]
    upsert?: transfersUpsertWithWhereUniqueWithoutUsers_transfers_created_byTousersInput | transfersUpsertWithWhereUniqueWithoutUsers_transfers_created_byTousersInput[]
    createMany?: transfersCreateManyUsers_transfers_created_byTousersInputEnvelope
    set?: transfersWhereUniqueInput | transfersWhereUniqueInput[]
    disconnect?: transfersWhereUniqueInput | transfersWhereUniqueInput[]
    delete?: transfersWhereUniqueInput | transfersWhereUniqueInput[]
    connect?: transfersWhereUniqueInput | transfersWhereUniqueInput[]
    update?: transfersUpdateWithWhereUniqueWithoutUsers_transfers_created_byTousersInput | transfersUpdateWithWhereUniqueWithoutUsers_transfers_created_byTousersInput[]
    updateMany?: transfersUpdateManyWithWhereWithoutUsers_transfers_created_byTousersInput | transfersUpdateManyWithWhereWithoutUsers_transfers_created_byTousersInput[]
    deleteMany?: transfersScalarWhereInput | transfersScalarWhereInput[]
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type basesCreateWithoutAssetsInput = {
    id?: string
    name: string
    code: string
    location: string
    is_active?: boolean | null
    created_at?: Date | string | null
    assignments?: assignmentsCreateNestedManyWithoutBasesInput
    users_bases_commander_idTousers?: usersCreateNestedOneWithoutBases_bases_commander_idTousersInput
    expenditures?: expendituresCreateNestedManyWithoutBasesInput
    personnel?: personnelCreateNestedManyWithoutBasesInput
    purchases?: purchasesCreateNestedManyWithoutBasesInput
    transfers_transfers_from_base_idTobases?: transfersCreateNestedManyWithoutBases_transfers_from_base_idTobasesInput
    transfers_transfers_to_base_idTobases?: transfersCreateNestedManyWithoutBases_transfers_to_base_idTobasesInput
    users_users_base_idTobases?: usersCreateNestedManyWithoutBases_users_base_idTobasesInput
  }

  export type basesUncheckedCreateWithoutAssetsInput = {
    id?: string
    name: string
    code: string
    location: string
    commander_id?: string | null
    is_active?: boolean | null
    created_at?: Date | string | null
    assignments?: assignmentsUncheckedCreateNestedManyWithoutBasesInput
    expenditures?: expendituresUncheckedCreateNestedManyWithoutBasesInput
    personnel?: personnelUncheckedCreateNestedManyWithoutBasesInput
    purchases?: purchasesUncheckedCreateNestedManyWithoutBasesInput
    transfers_transfers_from_base_idTobases?: transfersUncheckedCreateNestedManyWithoutBases_transfers_from_base_idTobasesInput
    transfers_transfers_to_base_idTobases?: transfersUncheckedCreateNestedManyWithoutBases_transfers_to_base_idTobasesInput
    users_users_base_idTobases?: usersUncheckedCreateNestedManyWithoutBases_users_base_idTobasesInput
  }

  export type basesCreateOrConnectWithoutAssetsInput = {
    where: basesWhereUniqueInput
    create: XOR<basesCreateWithoutAssetsInput, basesUncheckedCreateWithoutAssetsInput>
  }

  export type purchasesCreateWithoutAssetsInput = {
    id?: string
    quantity: number
    supplier?: string | null
    purchase_date: Date | string
    status?: string
    approved_at?: Date | string | null
    notes?: string | null
    created_at?: Date | string | null
    users_purchases_approved_byTousers?: usersCreateNestedOneWithoutPurchases_purchases_approved_byTousersInput
    bases: basesCreateNestedOneWithoutPurchasesInput
    users_purchases_created_byTousers: usersCreateNestedOneWithoutPurchases_purchases_created_byTousersInput
  }

  export type purchasesUncheckedCreateWithoutAssetsInput = {
    id?: string
    base_id: string
    quantity: number
    supplier?: string | null
    purchase_date: Date | string
    status?: string
    approved_by?: string | null
    approved_at?: Date | string | null
    notes?: string | null
    created_by: string
    created_at?: Date | string | null
  }

  export type purchasesCreateOrConnectWithoutAssetsInput = {
    where: purchasesWhereUniqueInput
    create: XOR<purchasesCreateWithoutAssetsInput, purchasesUncheckedCreateWithoutAssetsInput>
  }

  export type purchasesCreateManyAssetsInputEnvelope = {
    data: purchasesCreateManyAssetsInput | purchasesCreateManyAssetsInput[]
    skipDuplicates?: boolean
  }

  export type basesUpsertWithoutAssetsInput = {
    update: XOR<basesUpdateWithoutAssetsInput, basesUncheckedUpdateWithoutAssetsInput>
    create: XOR<basesCreateWithoutAssetsInput, basesUncheckedCreateWithoutAssetsInput>
    where?: basesWhereInput
  }

  export type basesUpdateToOneWithWhereWithoutAssetsInput = {
    where?: basesWhereInput
    data: XOR<basesUpdateWithoutAssetsInput, basesUncheckedUpdateWithoutAssetsInput>
  }

  export type basesUpdateWithoutAssetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignments?: assignmentsUpdateManyWithoutBasesNestedInput
    users_bases_commander_idTousers?: usersUpdateOneWithoutBases_bases_commander_idTousersNestedInput
    expenditures?: expendituresUpdateManyWithoutBasesNestedInput
    personnel?: personnelUpdateManyWithoutBasesNestedInput
    purchases?: purchasesUpdateManyWithoutBasesNestedInput
    transfers_transfers_from_base_idTobases?: transfersUpdateManyWithoutBases_transfers_from_base_idTobasesNestedInput
    transfers_transfers_to_base_idTobases?: transfersUpdateManyWithoutBases_transfers_to_base_idTobasesNestedInput
    users_users_base_idTobases?: usersUpdateManyWithoutBases_users_base_idTobasesNestedInput
  }

  export type basesUncheckedUpdateWithoutAssetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    commander_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignments?: assignmentsUncheckedUpdateManyWithoutBasesNestedInput
    expenditures?: expendituresUncheckedUpdateManyWithoutBasesNestedInput
    personnel?: personnelUncheckedUpdateManyWithoutBasesNestedInput
    purchases?: purchasesUncheckedUpdateManyWithoutBasesNestedInput
    transfers_transfers_from_base_idTobases?: transfersUncheckedUpdateManyWithoutBases_transfers_from_base_idTobasesNestedInput
    transfers_transfers_to_base_idTobases?: transfersUncheckedUpdateManyWithoutBases_transfers_to_base_idTobasesNestedInput
    users_users_base_idTobases?: usersUncheckedUpdateManyWithoutBases_users_base_idTobasesNestedInput
  }

  export type purchasesUpsertWithWhereUniqueWithoutAssetsInput = {
    where: purchasesWhereUniqueInput
    update: XOR<purchasesUpdateWithoutAssetsInput, purchasesUncheckedUpdateWithoutAssetsInput>
    create: XOR<purchasesCreateWithoutAssetsInput, purchasesUncheckedCreateWithoutAssetsInput>
  }

  export type purchasesUpdateWithWhereUniqueWithoutAssetsInput = {
    where: purchasesWhereUniqueInput
    data: XOR<purchasesUpdateWithoutAssetsInput, purchasesUncheckedUpdateWithoutAssetsInput>
  }

  export type purchasesUpdateManyWithWhereWithoutAssetsInput = {
    where: purchasesScalarWhereInput
    data: XOR<purchasesUpdateManyMutationInput, purchasesUncheckedUpdateManyWithoutAssetsInput>
  }

  export type purchasesScalarWhereInput = {
    AND?: purchasesScalarWhereInput | purchasesScalarWhereInput[]
    OR?: purchasesScalarWhereInput[]
    NOT?: purchasesScalarWhereInput | purchasesScalarWhereInput[]
    id?: UuidFilter<"purchases"> | string
    asset_id?: UuidFilter<"purchases"> | string
    base_id?: UuidFilter<"purchases"> | string
    quantity?: IntFilter<"purchases"> | number
    supplier?: StringNullableFilter<"purchases"> | string | null
    purchase_date?: DateTimeFilter<"purchases"> | Date | string
    status?: StringFilter<"purchases"> | string
    approved_by?: UuidNullableFilter<"purchases"> | string | null
    approved_at?: DateTimeNullableFilter<"purchases"> | Date | string | null
    notes?: StringNullableFilter<"purchases"> | string | null
    created_by?: UuidFilter<"purchases"> | string
    created_at?: DateTimeNullableFilter<"purchases"> | Date | string | null
  }

  export type usersCreateWithoutAssignmentsInput = {
    id?: string
    username: string
    email: string
    password_hash: string
    first_name: string
    last_name: string
    role: string
    is_active?: boolean | null
    created_at?: Date | string | null
    audit_logs?: audit_logsCreateNestedManyWithoutUsersInput
    bases_bases_commander_idTousers?: basesCreateNestedManyWithoutUsers_bases_commander_idTousersInput
    expenditures_expenditures_authorized_byTousers?: expendituresCreateNestedManyWithoutUsers_expenditures_authorized_byTousersInput
    expenditures_expenditures_created_byTousers?: expendituresCreateNestedManyWithoutUsers_expenditures_created_byTousersInput
    purchases_purchases_approved_byTousers?: purchasesCreateNestedManyWithoutUsers_purchases_approved_byTousersInput
    purchases_purchases_created_byTousers?: purchasesCreateNestedManyWithoutUsers_purchases_created_byTousersInput
    transfers_transfers_approved_byTousers?: transfersCreateNestedManyWithoutUsers_transfers_approved_byTousersInput
    transfers_transfers_created_byTousers?: transfersCreateNestedManyWithoutUsers_transfers_created_byTousersInput
    bases_users_base_idTobases?: basesCreateNestedOneWithoutUsers_users_base_idTobasesInput
  }

  export type usersUncheckedCreateWithoutAssignmentsInput = {
    id?: string
    username: string
    email: string
    password_hash: string
    first_name: string
    last_name: string
    role: string
    base_id?: string | null
    is_active?: boolean | null
    created_at?: Date | string | null
    audit_logs?: audit_logsUncheckedCreateNestedManyWithoutUsersInput
    bases_bases_commander_idTousers?: basesUncheckedCreateNestedManyWithoutUsers_bases_commander_idTousersInput
    expenditures_expenditures_authorized_byTousers?: expendituresUncheckedCreateNestedManyWithoutUsers_expenditures_authorized_byTousersInput
    expenditures_expenditures_created_byTousers?: expendituresUncheckedCreateNestedManyWithoutUsers_expenditures_created_byTousersInput
    purchases_purchases_approved_byTousers?: purchasesUncheckedCreateNestedManyWithoutUsers_purchases_approved_byTousersInput
    purchases_purchases_created_byTousers?: purchasesUncheckedCreateNestedManyWithoutUsers_purchases_created_byTousersInput
    transfers_transfers_approved_byTousers?: transfersUncheckedCreateNestedManyWithoutUsers_transfers_approved_byTousersInput
    transfers_transfers_created_byTousers?: transfersUncheckedCreateNestedManyWithoutUsers_transfers_created_byTousersInput
  }

  export type usersCreateOrConnectWithoutAssignmentsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutAssignmentsInput, usersUncheckedCreateWithoutAssignmentsInput>
  }

  export type personnelCreateWithoutAssignmentsInput = {
    id?: string
    first_name: string
    last_name: string
    rank: string
    email?: string | null
    phone?: string | null
    department?: string | null
    is_active?: boolean | null
    created_at?: Date | string | null
    expenditures?: expendituresCreateNestedManyWithoutPersonnelInput
    bases: basesCreateNestedOneWithoutPersonnelInput
  }

  export type personnelUncheckedCreateWithoutAssignmentsInput = {
    id?: string
    first_name: string
    last_name: string
    rank: string
    base_id: string
    email?: string | null
    phone?: string | null
    department?: string | null
    is_active?: boolean | null
    created_at?: Date | string | null
    expenditures?: expendituresUncheckedCreateNestedManyWithoutPersonnelInput
  }

  export type personnelCreateOrConnectWithoutAssignmentsInput = {
    where: personnelWhereUniqueInput
    create: XOR<personnelCreateWithoutAssignmentsInput, personnelUncheckedCreateWithoutAssignmentsInput>
  }

  export type basesCreateWithoutAssignmentsInput = {
    id?: string
    name: string
    code: string
    location: string
    is_active?: boolean | null
    created_at?: Date | string | null
    assets?: assetsCreateNestedManyWithoutBasesInput
    users_bases_commander_idTousers?: usersCreateNestedOneWithoutBases_bases_commander_idTousersInput
    expenditures?: expendituresCreateNestedManyWithoutBasesInput
    personnel?: personnelCreateNestedManyWithoutBasesInput
    purchases?: purchasesCreateNestedManyWithoutBasesInput
    transfers_transfers_from_base_idTobases?: transfersCreateNestedManyWithoutBases_transfers_from_base_idTobasesInput
    transfers_transfers_to_base_idTobases?: transfersCreateNestedManyWithoutBases_transfers_to_base_idTobasesInput
    users_users_base_idTobases?: usersCreateNestedManyWithoutBases_users_base_idTobasesInput
  }

  export type basesUncheckedCreateWithoutAssignmentsInput = {
    id?: string
    name: string
    code: string
    location: string
    commander_id?: string | null
    is_active?: boolean | null
    created_at?: Date | string | null
    assets?: assetsUncheckedCreateNestedManyWithoutBasesInput
    expenditures?: expendituresUncheckedCreateNestedManyWithoutBasesInput
    personnel?: personnelUncheckedCreateNestedManyWithoutBasesInput
    purchases?: purchasesUncheckedCreateNestedManyWithoutBasesInput
    transfers_transfers_from_base_idTobases?: transfersUncheckedCreateNestedManyWithoutBases_transfers_from_base_idTobasesInput
    transfers_transfers_to_base_idTobases?: transfersUncheckedCreateNestedManyWithoutBases_transfers_to_base_idTobasesInput
    users_users_base_idTobases?: usersUncheckedCreateNestedManyWithoutBases_users_base_idTobasesInput
  }

  export type basesCreateOrConnectWithoutAssignmentsInput = {
    where: basesWhereUniqueInput
    create: XOR<basesCreateWithoutAssignmentsInput, basesUncheckedCreateWithoutAssignmentsInput>
  }

  export type usersUpsertWithoutAssignmentsInput = {
    update: XOR<usersUpdateWithoutAssignmentsInput, usersUncheckedUpdateWithoutAssignmentsInput>
    create: XOR<usersCreateWithoutAssignmentsInput, usersUncheckedCreateWithoutAssignmentsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutAssignmentsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutAssignmentsInput, usersUncheckedUpdateWithoutAssignmentsInput>
  }

  export type usersUpdateWithoutAssignmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    audit_logs?: audit_logsUpdateManyWithoutUsersNestedInput
    bases_bases_commander_idTousers?: basesUpdateManyWithoutUsers_bases_commander_idTousersNestedInput
    expenditures_expenditures_authorized_byTousers?: expendituresUpdateManyWithoutUsers_expenditures_authorized_byTousersNestedInput
    expenditures_expenditures_created_byTousers?: expendituresUpdateManyWithoutUsers_expenditures_created_byTousersNestedInput
    purchases_purchases_approved_byTousers?: purchasesUpdateManyWithoutUsers_purchases_approved_byTousersNestedInput
    purchases_purchases_created_byTousers?: purchasesUpdateManyWithoutUsers_purchases_created_byTousersNestedInput
    transfers_transfers_approved_byTousers?: transfersUpdateManyWithoutUsers_transfers_approved_byTousersNestedInput
    transfers_transfers_created_byTousers?: transfersUpdateManyWithoutUsers_transfers_created_byTousersNestedInput
    bases_users_base_idTobases?: basesUpdateOneWithoutUsers_users_base_idTobasesNestedInput
  }

  export type usersUncheckedUpdateWithoutAssignmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    base_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    audit_logs?: audit_logsUncheckedUpdateManyWithoutUsersNestedInput
    bases_bases_commander_idTousers?: basesUncheckedUpdateManyWithoutUsers_bases_commander_idTousersNestedInput
    expenditures_expenditures_authorized_byTousers?: expendituresUncheckedUpdateManyWithoutUsers_expenditures_authorized_byTousersNestedInput
    expenditures_expenditures_created_byTousers?: expendituresUncheckedUpdateManyWithoutUsers_expenditures_created_byTousersNestedInput
    purchases_purchases_approved_byTousers?: purchasesUncheckedUpdateManyWithoutUsers_purchases_approved_byTousersNestedInput
    purchases_purchases_created_byTousers?: purchasesUncheckedUpdateManyWithoutUsers_purchases_created_byTousersNestedInput
    transfers_transfers_approved_byTousers?: transfersUncheckedUpdateManyWithoutUsers_transfers_approved_byTousersNestedInput
    transfers_transfers_created_byTousers?: transfersUncheckedUpdateManyWithoutUsers_transfers_created_byTousersNestedInput
  }

  export type personnelUpsertWithoutAssignmentsInput = {
    update: XOR<personnelUpdateWithoutAssignmentsInput, personnelUncheckedUpdateWithoutAssignmentsInput>
    create: XOR<personnelCreateWithoutAssignmentsInput, personnelUncheckedCreateWithoutAssignmentsInput>
    where?: personnelWhereInput
  }

  export type personnelUpdateToOneWithWhereWithoutAssignmentsInput = {
    where?: personnelWhereInput
    data: XOR<personnelUpdateWithoutAssignmentsInput, personnelUncheckedUpdateWithoutAssignmentsInput>
  }

  export type personnelUpdateWithoutAssignmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    rank?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expenditures?: expendituresUpdateManyWithoutPersonnelNestedInput
    bases?: basesUpdateOneRequiredWithoutPersonnelNestedInput
  }

  export type personnelUncheckedUpdateWithoutAssignmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    rank?: StringFieldUpdateOperationsInput | string
    base_id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expenditures?: expendituresUncheckedUpdateManyWithoutPersonnelNestedInput
  }

  export type basesUpsertWithoutAssignmentsInput = {
    update: XOR<basesUpdateWithoutAssignmentsInput, basesUncheckedUpdateWithoutAssignmentsInput>
    create: XOR<basesCreateWithoutAssignmentsInput, basesUncheckedCreateWithoutAssignmentsInput>
    where?: basesWhereInput
  }

  export type basesUpdateToOneWithWhereWithoutAssignmentsInput = {
    where?: basesWhereInput
    data: XOR<basesUpdateWithoutAssignmentsInput, basesUncheckedUpdateWithoutAssignmentsInput>
  }

  export type basesUpdateWithoutAssignmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assets?: assetsUpdateManyWithoutBasesNestedInput
    users_bases_commander_idTousers?: usersUpdateOneWithoutBases_bases_commander_idTousersNestedInput
    expenditures?: expendituresUpdateManyWithoutBasesNestedInput
    personnel?: personnelUpdateManyWithoutBasesNestedInput
    purchases?: purchasesUpdateManyWithoutBasesNestedInput
    transfers_transfers_from_base_idTobases?: transfersUpdateManyWithoutBases_transfers_from_base_idTobasesNestedInput
    transfers_transfers_to_base_idTobases?: transfersUpdateManyWithoutBases_transfers_to_base_idTobasesNestedInput
    users_users_base_idTobases?: usersUpdateManyWithoutBases_users_base_idTobasesNestedInput
  }

  export type basesUncheckedUpdateWithoutAssignmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    commander_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assets?: assetsUncheckedUpdateManyWithoutBasesNestedInput
    expenditures?: expendituresUncheckedUpdateManyWithoutBasesNestedInput
    personnel?: personnelUncheckedUpdateManyWithoutBasesNestedInput
    purchases?: purchasesUncheckedUpdateManyWithoutBasesNestedInput
    transfers_transfers_from_base_idTobases?: transfersUncheckedUpdateManyWithoutBases_transfers_from_base_idTobasesNestedInput
    transfers_transfers_to_base_idTobases?: transfersUncheckedUpdateManyWithoutBases_transfers_to_base_idTobasesNestedInput
    users_users_base_idTobases?: usersUncheckedUpdateManyWithoutBases_users_base_idTobasesNestedInput
  }

  export type usersCreateWithoutAudit_logsInput = {
    id?: string
    username: string
    email: string
    password_hash: string
    first_name: string
    last_name: string
    role: string
    is_active?: boolean | null
    created_at?: Date | string | null
    assignments?: assignmentsCreateNestedManyWithoutUsersInput
    bases_bases_commander_idTousers?: basesCreateNestedManyWithoutUsers_bases_commander_idTousersInput
    expenditures_expenditures_authorized_byTousers?: expendituresCreateNestedManyWithoutUsers_expenditures_authorized_byTousersInput
    expenditures_expenditures_created_byTousers?: expendituresCreateNestedManyWithoutUsers_expenditures_created_byTousersInput
    purchases_purchases_approved_byTousers?: purchasesCreateNestedManyWithoutUsers_purchases_approved_byTousersInput
    purchases_purchases_created_byTousers?: purchasesCreateNestedManyWithoutUsers_purchases_created_byTousersInput
    transfers_transfers_approved_byTousers?: transfersCreateNestedManyWithoutUsers_transfers_approved_byTousersInput
    transfers_transfers_created_byTousers?: transfersCreateNestedManyWithoutUsers_transfers_created_byTousersInput
    bases_users_base_idTobases?: basesCreateNestedOneWithoutUsers_users_base_idTobasesInput
  }

  export type usersUncheckedCreateWithoutAudit_logsInput = {
    id?: string
    username: string
    email: string
    password_hash: string
    first_name: string
    last_name: string
    role: string
    base_id?: string | null
    is_active?: boolean | null
    created_at?: Date | string | null
    assignments?: assignmentsUncheckedCreateNestedManyWithoutUsersInput
    bases_bases_commander_idTousers?: basesUncheckedCreateNestedManyWithoutUsers_bases_commander_idTousersInput
    expenditures_expenditures_authorized_byTousers?: expendituresUncheckedCreateNestedManyWithoutUsers_expenditures_authorized_byTousersInput
    expenditures_expenditures_created_byTousers?: expendituresUncheckedCreateNestedManyWithoutUsers_expenditures_created_byTousersInput
    purchases_purchases_approved_byTousers?: purchasesUncheckedCreateNestedManyWithoutUsers_purchases_approved_byTousersInput
    purchases_purchases_created_byTousers?: purchasesUncheckedCreateNestedManyWithoutUsers_purchases_created_byTousersInput
    transfers_transfers_approved_byTousers?: transfersUncheckedCreateNestedManyWithoutUsers_transfers_approved_byTousersInput
    transfers_transfers_created_byTousers?: transfersUncheckedCreateNestedManyWithoutUsers_transfers_created_byTousersInput
  }

  export type usersCreateOrConnectWithoutAudit_logsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutAudit_logsInput, usersUncheckedCreateWithoutAudit_logsInput>
  }

  export type usersUpsertWithoutAudit_logsInput = {
    update: XOR<usersUpdateWithoutAudit_logsInput, usersUncheckedUpdateWithoutAudit_logsInput>
    create: XOR<usersCreateWithoutAudit_logsInput, usersUncheckedCreateWithoutAudit_logsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutAudit_logsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutAudit_logsInput, usersUncheckedUpdateWithoutAudit_logsInput>
  }

  export type usersUpdateWithoutAudit_logsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignments?: assignmentsUpdateManyWithoutUsersNestedInput
    bases_bases_commander_idTousers?: basesUpdateManyWithoutUsers_bases_commander_idTousersNestedInput
    expenditures_expenditures_authorized_byTousers?: expendituresUpdateManyWithoutUsers_expenditures_authorized_byTousersNestedInput
    expenditures_expenditures_created_byTousers?: expendituresUpdateManyWithoutUsers_expenditures_created_byTousersNestedInput
    purchases_purchases_approved_byTousers?: purchasesUpdateManyWithoutUsers_purchases_approved_byTousersNestedInput
    purchases_purchases_created_byTousers?: purchasesUpdateManyWithoutUsers_purchases_created_byTousersNestedInput
    transfers_transfers_approved_byTousers?: transfersUpdateManyWithoutUsers_transfers_approved_byTousersNestedInput
    transfers_transfers_created_byTousers?: transfersUpdateManyWithoutUsers_transfers_created_byTousersNestedInput
    bases_users_base_idTobases?: basesUpdateOneWithoutUsers_users_base_idTobasesNestedInput
  }

  export type usersUncheckedUpdateWithoutAudit_logsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    base_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignments?: assignmentsUncheckedUpdateManyWithoutUsersNestedInput
    bases_bases_commander_idTousers?: basesUncheckedUpdateManyWithoutUsers_bases_commander_idTousersNestedInput
    expenditures_expenditures_authorized_byTousers?: expendituresUncheckedUpdateManyWithoutUsers_expenditures_authorized_byTousersNestedInput
    expenditures_expenditures_created_byTousers?: expendituresUncheckedUpdateManyWithoutUsers_expenditures_created_byTousersNestedInput
    purchases_purchases_approved_byTousers?: purchasesUncheckedUpdateManyWithoutUsers_purchases_approved_byTousersNestedInput
    purchases_purchases_created_byTousers?: purchasesUncheckedUpdateManyWithoutUsers_purchases_created_byTousersNestedInput
    transfers_transfers_approved_byTousers?: transfersUncheckedUpdateManyWithoutUsers_transfers_approved_byTousersNestedInput
    transfers_transfers_created_byTousers?: transfersUncheckedUpdateManyWithoutUsers_transfers_created_byTousersNestedInput
  }

  export type assetsCreateWithoutBasesInput = {
    id?: string
    name: string
    quantity?: number
    available_quantity?: number
    assigned_quantity?: number
    status?: string
    created_at?: Date | string | null
    purchases?: purchasesCreateNestedManyWithoutAssetsInput
  }

  export type assetsUncheckedCreateWithoutBasesInput = {
    id?: string
    name: string
    quantity?: number
    available_quantity?: number
    assigned_quantity?: number
    status?: string
    created_at?: Date | string | null
    purchases?: purchasesUncheckedCreateNestedManyWithoutAssetsInput
  }

  export type assetsCreateOrConnectWithoutBasesInput = {
    where: assetsWhereUniqueInput
    create: XOR<assetsCreateWithoutBasesInput, assetsUncheckedCreateWithoutBasesInput>
  }

  export type assetsCreateManyBasesInputEnvelope = {
    data: assetsCreateManyBasesInput | assetsCreateManyBasesInput[]
    skipDuplicates?: boolean
  }

  export type assignmentsCreateWithoutBasesInput = {
    id?: string
    asset_name: string
    quantity?: number
    expended_quantity?: number
    assignment_date: Date | string
    status?: string
    notes?: string | null
    created_at?: Date | string | null
    users: usersCreateNestedOneWithoutAssignmentsInput
    personnel: personnelCreateNestedOneWithoutAssignmentsInput
  }

  export type assignmentsUncheckedCreateWithoutBasesInput = {
    id?: string
    asset_name: string
    assigned_to: string
    assigned_by: string
    quantity?: number
    expended_quantity?: number
    assignment_date: Date | string
    status?: string
    notes?: string | null
    created_at?: Date | string | null
  }

  export type assignmentsCreateOrConnectWithoutBasesInput = {
    where: assignmentsWhereUniqueInput
    create: XOR<assignmentsCreateWithoutBasesInput, assignmentsUncheckedCreateWithoutBasesInput>
  }

  export type assignmentsCreateManyBasesInputEnvelope = {
    data: assignmentsCreateManyBasesInput | assignmentsCreateManyBasesInput[]
    skipDuplicates?: boolean
  }

  export type usersCreateWithoutBases_bases_commander_idTousersInput = {
    id?: string
    username: string
    email: string
    password_hash: string
    first_name: string
    last_name: string
    role: string
    is_active?: boolean | null
    created_at?: Date | string | null
    assignments?: assignmentsCreateNestedManyWithoutUsersInput
    audit_logs?: audit_logsCreateNestedManyWithoutUsersInput
    expenditures_expenditures_authorized_byTousers?: expendituresCreateNestedManyWithoutUsers_expenditures_authorized_byTousersInput
    expenditures_expenditures_created_byTousers?: expendituresCreateNestedManyWithoutUsers_expenditures_created_byTousersInput
    purchases_purchases_approved_byTousers?: purchasesCreateNestedManyWithoutUsers_purchases_approved_byTousersInput
    purchases_purchases_created_byTousers?: purchasesCreateNestedManyWithoutUsers_purchases_created_byTousersInput
    transfers_transfers_approved_byTousers?: transfersCreateNestedManyWithoutUsers_transfers_approved_byTousersInput
    transfers_transfers_created_byTousers?: transfersCreateNestedManyWithoutUsers_transfers_created_byTousersInput
    bases_users_base_idTobases?: basesCreateNestedOneWithoutUsers_users_base_idTobasesInput
  }

  export type usersUncheckedCreateWithoutBases_bases_commander_idTousersInput = {
    id?: string
    username: string
    email: string
    password_hash: string
    first_name: string
    last_name: string
    role: string
    base_id?: string | null
    is_active?: boolean | null
    created_at?: Date | string | null
    assignments?: assignmentsUncheckedCreateNestedManyWithoutUsersInput
    audit_logs?: audit_logsUncheckedCreateNestedManyWithoutUsersInput
    expenditures_expenditures_authorized_byTousers?: expendituresUncheckedCreateNestedManyWithoutUsers_expenditures_authorized_byTousersInput
    expenditures_expenditures_created_byTousers?: expendituresUncheckedCreateNestedManyWithoutUsers_expenditures_created_byTousersInput
    purchases_purchases_approved_byTousers?: purchasesUncheckedCreateNestedManyWithoutUsers_purchases_approved_byTousersInput
    purchases_purchases_created_byTousers?: purchasesUncheckedCreateNestedManyWithoutUsers_purchases_created_byTousersInput
    transfers_transfers_approved_byTousers?: transfersUncheckedCreateNestedManyWithoutUsers_transfers_approved_byTousersInput
    transfers_transfers_created_byTousers?: transfersUncheckedCreateNestedManyWithoutUsers_transfers_created_byTousersInput
  }

  export type usersCreateOrConnectWithoutBases_bases_commander_idTousersInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutBases_bases_commander_idTousersInput, usersUncheckedCreateWithoutBases_bases_commander_idTousersInput>
  }

  export type expendituresCreateWithoutBasesInput = {
    id?: string
    asset_name: string
    quantity: number
    expenditure_date: Date | string
    reason: string
    notes?: string | null
    created_at?: Date | string | null
    users_expenditures_authorized_byTousers?: usersCreateNestedOneWithoutExpenditures_expenditures_authorized_byTousersInput
    users_expenditures_created_byTousers: usersCreateNestedOneWithoutExpenditures_expenditures_created_byTousersInput
    personnel?: personnelCreateNestedOneWithoutExpendituresInput
  }

  export type expendituresUncheckedCreateWithoutBasesInput = {
    id?: string
    asset_name: string
    personnel_id?: string | null
    quantity: number
    expenditure_date: Date | string
    reason: string
    authorized_by?: string | null
    notes?: string | null
    created_by: string
    created_at?: Date | string | null
  }

  export type expendituresCreateOrConnectWithoutBasesInput = {
    where: expendituresWhereUniqueInput
    create: XOR<expendituresCreateWithoutBasesInput, expendituresUncheckedCreateWithoutBasesInput>
  }

  export type expendituresCreateManyBasesInputEnvelope = {
    data: expendituresCreateManyBasesInput | expendituresCreateManyBasesInput[]
    skipDuplicates?: boolean
  }

  export type personnelCreateWithoutBasesInput = {
    id?: string
    first_name: string
    last_name: string
    rank: string
    email?: string | null
    phone?: string | null
    department?: string | null
    is_active?: boolean | null
    created_at?: Date | string | null
    assignments?: assignmentsCreateNestedManyWithoutPersonnelInput
    expenditures?: expendituresCreateNestedManyWithoutPersonnelInput
  }

  export type personnelUncheckedCreateWithoutBasesInput = {
    id?: string
    first_name: string
    last_name: string
    rank: string
    email?: string | null
    phone?: string | null
    department?: string | null
    is_active?: boolean | null
    created_at?: Date | string | null
    assignments?: assignmentsUncheckedCreateNestedManyWithoutPersonnelInput
    expenditures?: expendituresUncheckedCreateNestedManyWithoutPersonnelInput
  }

  export type personnelCreateOrConnectWithoutBasesInput = {
    where: personnelWhereUniqueInput
    create: XOR<personnelCreateWithoutBasesInput, personnelUncheckedCreateWithoutBasesInput>
  }

  export type personnelCreateManyBasesInputEnvelope = {
    data: personnelCreateManyBasesInput | personnelCreateManyBasesInput[]
    skipDuplicates?: boolean
  }

  export type purchasesCreateWithoutBasesInput = {
    id?: string
    quantity: number
    supplier?: string | null
    purchase_date: Date | string
    status?: string
    approved_at?: Date | string | null
    notes?: string | null
    created_at?: Date | string | null
    users_purchases_approved_byTousers?: usersCreateNestedOneWithoutPurchases_purchases_approved_byTousersInput
    assets: assetsCreateNestedOneWithoutPurchasesInput
    users_purchases_created_byTousers: usersCreateNestedOneWithoutPurchases_purchases_created_byTousersInput
  }

  export type purchasesUncheckedCreateWithoutBasesInput = {
    id?: string
    asset_id: string
    quantity: number
    supplier?: string | null
    purchase_date: Date | string
    status?: string
    approved_by?: string | null
    approved_at?: Date | string | null
    notes?: string | null
    created_by: string
    created_at?: Date | string | null
  }

  export type purchasesCreateOrConnectWithoutBasesInput = {
    where: purchasesWhereUniqueInput
    create: XOR<purchasesCreateWithoutBasesInput, purchasesUncheckedCreateWithoutBasesInput>
  }

  export type purchasesCreateManyBasesInputEnvelope = {
    data: purchasesCreateManyBasesInput | purchasesCreateManyBasesInput[]
    skipDuplicates?: boolean
  }

  export type transfersCreateWithoutBases_transfers_from_base_idTobasesInput = {
    id?: string
    transfer_number: string
    asset_name: string
    quantity: number
    transfer_date: Date | string
    status?: string
    approved_at?: Date | string | null
    notes?: string | null
    created_at?: Date | string | null
    users_transfers_approved_byTousers?: usersCreateNestedOneWithoutTransfers_transfers_approved_byTousersInput
    users_transfers_created_byTousers: usersCreateNestedOneWithoutTransfers_transfers_created_byTousersInput
    bases_transfers_to_base_idTobases: basesCreateNestedOneWithoutTransfers_transfers_to_base_idTobasesInput
  }

  export type transfersUncheckedCreateWithoutBases_transfers_from_base_idTobasesInput = {
    id?: string
    transfer_number: string
    to_base_id: string
    asset_name: string
    quantity: number
    transfer_date: Date | string
    status?: string
    approved_by?: string | null
    approved_at?: Date | string | null
    notes?: string | null
    created_by: string
    created_at?: Date | string | null
  }

  export type transfersCreateOrConnectWithoutBases_transfers_from_base_idTobasesInput = {
    where: transfersWhereUniqueInput
    create: XOR<transfersCreateWithoutBases_transfers_from_base_idTobasesInput, transfersUncheckedCreateWithoutBases_transfers_from_base_idTobasesInput>
  }

  export type transfersCreateManyBases_transfers_from_base_idTobasesInputEnvelope = {
    data: transfersCreateManyBases_transfers_from_base_idTobasesInput | transfersCreateManyBases_transfers_from_base_idTobasesInput[]
    skipDuplicates?: boolean
  }

  export type transfersCreateWithoutBases_transfers_to_base_idTobasesInput = {
    id?: string
    transfer_number: string
    asset_name: string
    quantity: number
    transfer_date: Date | string
    status?: string
    approved_at?: Date | string | null
    notes?: string | null
    created_at?: Date | string | null
    users_transfers_approved_byTousers?: usersCreateNestedOneWithoutTransfers_transfers_approved_byTousersInput
    users_transfers_created_byTousers: usersCreateNestedOneWithoutTransfers_transfers_created_byTousersInput
    bases_transfers_from_base_idTobases: basesCreateNestedOneWithoutTransfers_transfers_from_base_idTobasesInput
  }

  export type transfersUncheckedCreateWithoutBases_transfers_to_base_idTobasesInput = {
    id?: string
    transfer_number: string
    from_base_id: string
    asset_name: string
    quantity: number
    transfer_date: Date | string
    status?: string
    approved_by?: string | null
    approved_at?: Date | string | null
    notes?: string | null
    created_by: string
    created_at?: Date | string | null
  }

  export type transfersCreateOrConnectWithoutBases_transfers_to_base_idTobasesInput = {
    where: transfersWhereUniqueInput
    create: XOR<transfersCreateWithoutBases_transfers_to_base_idTobasesInput, transfersUncheckedCreateWithoutBases_transfers_to_base_idTobasesInput>
  }

  export type transfersCreateManyBases_transfers_to_base_idTobasesInputEnvelope = {
    data: transfersCreateManyBases_transfers_to_base_idTobasesInput | transfersCreateManyBases_transfers_to_base_idTobasesInput[]
    skipDuplicates?: boolean
  }

  export type usersCreateWithoutBases_users_base_idTobasesInput = {
    id?: string
    username: string
    email: string
    password_hash: string
    first_name: string
    last_name: string
    role: string
    is_active?: boolean | null
    created_at?: Date | string | null
    assignments?: assignmentsCreateNestedManyWithoutUsersInput
    audit_logs?: audit_logsCreateNestedManyWithoutUsersInput
    bases_bases_commander_idTousers?: basesCreateNestedManyWithoutUsers_bases_commander_idTousersInput
    expenditures_expenditures_authorized_byTousers?: expendituresCreateNestedManyWithoutUsers_expenditures_authorized_byTousersInput
    expenditures_expenditures_created_byTousers?: expendituresCreateNestedManyWithoutUsers_expenditures_created_byTousersInput
    purchases_purchases_approved_byTousers?: purchasesCreateNestedManyWithoutUsers_purchases_approved_byTousersInput
    purchases_purchases_created_byTousers?: purchasesCreateNestedManyWithoutUsers_purchases_created_byTousersInput
    transfers_transfers_approved_byTousers?: transfersCreateNestedManyWithoutUsers_transfers_approved_byTousersInput
    transfers_transfers_created_byTousers?: transfersCreateNestedManyWithoutUsers_transfers_created_byTousersInput
  }

  export type usersUncheckedCreateWithoutBases_users_base_idTobasesInput = {
    id?: string
    username: string
    email: string
    password_hash: string
    first_name: string
    last_name: string
    role: string
    is_active?: boolean | null
    created_at?: Date | string | null
    assignments?: assignmentsUncheckedCreateNestedManyWithoutUsersInput
    audit_logs?: audit_logsUncheckedCreateNestedManyWithoutUsersInput
    bases_bases_commander_idTousers?: basesUncheckedCreateNestedManyWithoutUsers_bases_commander_idTousersInput
    expenditures_expenditures_authorized_byTousers?: expendituresUncheckedCreateNestedManyWithoutUsers_expenditures_authorized_byTousersInput
    expenditures_expenditures_created_byTousers?: expendituresUncheckedCreateNestedManyWithoutUsers_expenditures_created_byTousersInput
    purchases_purchases_approved_byTousers?: purchasesUncheckedCreateNestedManyWithoutUsers_purchases_approved_byTousersInput
    purchases_purchases_created_byTousers?: purchasesUncheckedCreateNestedManyWithoutUsers_purchases_created_byTousersInput
    transfers_transfers_approved_byTousers?: transfersUncheckedCreateNestedManyWithoutUsers_transfers_approved_byTousersInput
    transfers_transfers_created_byTousers?: transfersUncheckedCreateNestedManyWithoutUsers_transfers_created_byTousersInput
  }

  export type usersCreateOrConnectWithoutBases_users_base_idTobasesInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutBases_users_base_idTobasesInput, usersUncheckedCreateWithoutBases_users_base_idTobasesInput>
  }

  export type usersCreateManyBases_users_base_idTobasesInputEnvelope = {
    data: usersCreateManyBases_users_base_idTobasesInput | usersCreateManyBases_users_base_idTobasesInput[]
    skipDuplicates?: boolean
  }

  export type assetsUpsertWithWhereUniqueWithoutBasesInput = {
    where: assetsWhereUniqueInput
    update: XOR<assetsUpdateWithoutBasesInput, assetsUncheckedUpdateWithoutBasesInput>
    create: XOR<assetsCreateWithoutBasesInput, assetsUncheckedCreateWithoutBasesInput>
  }

  export type assetsUpdateWithWhereUniqueWithoutBasesInput = {
    where: assetsWhereUniqueInput
    data: XOR<assetsUpdateWithoutBasesInput, assetsUncheckedUpdateWithoutBasesInput>
  }

  export type assetsUpdateManyWithWhereWithoutBasesInput = {
    where: assetsScalarWhereInput
    data: XOR<assetsUpdateManyMutationInput, assetsUncheckedUpdateManyWithoutBasesInput>
  }

  export type assetsScalarWhereInput = {
    AND?: assetsScalarWhereInput | assetsScalarWhereInput[]
    OR?: assetsScalarWhereInput[]
    NOT?: assetsScalarWhereInput | assetsScalarWhereInput[]
    id?: UuidFilter<"assets"> | string
    name?: StringFilter<"assets"> | string
    base_id?: UuidFilter<"assets"> | string
    quantity?: IntFilter<"assets"> | number
    available_quantity?: IntFilter<"assets"> | number
    assigned_quantity?: IntFilter<"assets"> | number
    status?: StringFilter<"assets"> | string
    created_at?: DateTimeNullableFilter<"assets"> | Date | string | null
  }

  export type assignmentsUpsertWithWhereUniqueWithoutBasesInput = {
    where: assignmentsWhereUniqueInput
    update: XOR<assignmentsUpdateWithoutBasesInput, assignmentsUncheckedUpdateWithoutBasesInput>
    create: XOR<assignmentsCreateWithoutBasesInput, assignmentsUncheckedCreateWithoutBasesInput>
  }

  export type assignmentsUpdateWithWhereUniqueWithoutBasesInput = {
    where: assignmentsWhereUniqueInput
    data: XOR<assignmentsUpdateWithoutBasesInput, assignmentsUncheckedUpdateWithoutBasesInput>
  }

  export type assignmentsUpdateManyWithWhereWithoutBasesInput = {
    where: assignmentsScalarWhereInput
    data: XOR<assignmentsUpdateManyMutationInput, assignmentsUncheckedUpdateManyWithoutBasesInput>
  }

  export type assignmentsScalarWhereInput = {
    AND?: assignmentsScalarWhereInput | assignmentsScalarWhereInput[]
    OR?: assignmentsScalarWhereInput[]
    NOT?: assignmentsScalarWhereInput | assignmentsScalarWhereInput[]
    id?: UuidFilter<"assignments"> | string
    asset_name?: StringFilter<"assignments"> | string
    assigned_to?: UuidFilter<"assignments"> | string
    assigned_by?: UuidFilter<"assignments"> | string
    base_id?: UuidFilter<"assignments"> | string
    quantity?: IntFilter<"assignments"> | number
    expended_quantity?: IntFilter<"assignments"> | number
    assignment_date?: DateTimeFilter<"assignments"> | Date | string
    status?: StringFilter<"assignments"> | string
    notes?: StringNullableFilter<"assignments"> | string | null
    created_at?: DateTimeNullableFilter<"assignments"> | Date | string | null
  }

  export type usersUpsertWithoutBases_bases_commander_idTousersInput = {
    update: XOR<usersUpdateWithoutBases_bases_commander_idTousersInput, usersUncheckedUpdateWithoutBases_bases_commander_idTousersInput>
    create: XOR<usersCreateWithoutBases_bases_commander_idTousersInput, usersUncheckedCreateWithoutBases_bases_commander_idTousersInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutBases_bases_commander_idTousersInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutBases_bases_commander_idTousersInput, usersUncheckedUpdateWithoutBases_bases_commander_idTousersInput>
  }

  export type usersUpdateWithoutBases_bases_commander_idTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignments?: assignmentsUpdateManyWithoutUsersNestedInput
    audit_logs?: audit_logsUpdateManyWithoutUsersNestedInput
    expenditures_expenditures_authorized_byTousers?: expendituresUpdateManyWithoutUsers_expenditures_authorized_byTousersNestedInput
    expenditures_expenditures_created_byTousers?: expendituresUpdateManyWithoutUsers_expenditures_created_byTousersNestedInput
    purchases_purchases_approved_byTousers?: purchasesUpdateManyWithoutUsers_purchases_approved_byTousersNestedInput
    purchases_purchases_created_byTousers?: purchasesUpdateManyWithoutUsers_purchases_created_byTousersNestedInput
    transfers_transfers_approved_byTousers?: transfersUpdateManyWithoutUsers_transfers_approved_byTousersNestedInput
    transfers_transfers_created_byTousers?: transfersUpdateManyWithoutUsers_transfers_created_byTousersNestedInput
    bases_users_base_idTobases?: basesUpdateOneWithoutUsers_users_base_idTobasesNestedInput
  }

  export type usersUncheckedUpdateWithoutBases_bases_commander_idTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    base_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignments?: assignmentsUncheckedUpdateManyWithoutUsersNestedInput
    audit_logs?: audit_logsUncheckedUpdateManyWithoutUsersNestedInput
    expenditures_expenditures_authorized_byTousers?: expendituresUncheckedUpdateManyWithoutUsers_expenditures_authorized_byTousersNestedInput
    expenditures_expenditures_created_byTousers?: expendituresUncheckedUpdateManyWithoutUsers_expenditures_created_byTousersNestedInput
    purchases_purchases_approved_byTousers?: purchasesUncheckedUpdateManyWithoutUsers_purchases_approved_byTousersNestedInput
    purchases_purchases_created_byTousers?: purchasesUncheckedUpdateManyWithoutUsers_purchases_created_byTousersNestedInput
    transfers_transfers_approved_byTousers?: transfersUncheckedUpdateManyWithoutUsers_transfers_approved_byTousersNestedInput
    transfers_transfers_created_byTousers?: transfersUncheckedUpdateManyWithoutUsers_transfers_created_byTousersNestedInput
  }

  export type expendituresUpsertWithWhereUniqueWithoutBasesInput = {
    where: expendituresWhereUniqueInput
    update: XOR<expendituresUpdateWithoutBasesInput, expendituresUncheckedUpdateWithoutBasesInput>
    create: XOR<expendituresCreateWithoutBasesInput, expendituresUncheckedCreateWithoutBasesInput>
  }

  export type expendituresUpdateWithWhereUniqueWithoutBasesInput = {
    where: expendituresWhereUniqueInput
    data: XOR<expendituresUpdateWithoutBasesInput, expendituresUncheckedUpdateWithoutBasesInput>
  }

  export type expendituresUpdateManyWithWhereWithoutBasesInput = {
    where: expendituresScalarWhereInput
    data: XOR<expendituresUpdateManyMutationInput, expendituresUncheckedUpdateManyWithoutBasesInput>
  }

  export type expendituresScalarWhereInput = {
    AND?: expendituresScalarWhereInput | expendituresScalarWhereInput[]
    OR?: expendituresScalarWhereInput[]
    NOT?: expendituresScalarWhereInput | expendituresScalarWhereInput[]
    id?: UuidFilter<"expenditures"> | string
    asset_name?: StringFilter<"expenditures"> | string
    base_id?: UuidFilter<"expenditures"> | string
    personnel_id?: UuidNullableFilter<"expenditures"> | string | null
    quantity?: IntFilter<"expenditures"> | number
    expenditure_date?: DateTimeFilter<"expenditures"> | Date | string
    reason?: StringFilter<"expenditures"> | string
    authorized_by?: UuidNullableFilter<"expenditures"> | string | null
    notes?: StringNullableFilter<"expenditures"> | string | null
    created_by?: UuidFilter<"expenditures"> | string
    created_at?: DateTimeNullableFilter<"expenditures"> | Date | string | null
  }

  export type personnelUpsertWithWhereUniqueWithoutBasesInput = {
    where: personnelWhereUniqueInput
    update: XOR<personnelUpdateWithoutBasesInput, personnelUncheckedUpdateWithoutBasesInput>
    create: XOR<personnelCreateWithoutBasesInput, personnelUncheckedCreateWithoutBasesInput>
  }

  export type personnelUpdateWithWhereUniqueWithoutBasesInput = {
    where: personnelWhereUniqueInput
    data: XOR<personnelUpdateWithoutBasesInput, personnelUncheckedUpdateWithoutBasesInput>
  }

  export type personnelUpdateManyWithWhereWithoutBasesInput = {
    where: personnelScalarWhereInput
    data: XOR<personnelUpdateManyMutationInput, personnelUncheckedUpdateManyWithoutBasesInput>
  }

  export type personnelScalarWhereInput = {
    AND?: personnelScalarWhereInput | personnelScalarWhereInput[]
    OR?: personnelScalarWhereInput[]
    NOT?: personnelScalarWhereInput | personnelScalarWhereInput[]
    id?: UuidFilter<"personnel"> | string
    first_name?: StringFilter<"personnel"> | string
    last_name?: StringFilter<"personnel"> | string
    rank?: StringFilter<"personnel"> | string
    base_id?: UuidFilter<"personnel"> | string
    email?: StringNullableFilter<"personnel"> | string | null
    phone?: StringNullableFilter<"personnel"> | string | null
    department?: StringNullableFilter<"personnel"> | string | null
    is_active?: BoolNullableFilter<"personnel"> | boolean | null
    created_at?: DateTimeNullableFilter<"personnel"> | Date | string | null
  }

  export type purchasesUpsertWithWhereUniqueWithoutBasesInput = {
    where: purchasesWhereUniqueInput
    update: XOR<purchasesUpdateWithoutBasesInput, purchasesUncheckedUpdateWithoutBasesInput>
    create: XOR<purchasesCreateWithoutBasesInput, purchasesUncheckedCreateWithoutBasesInput>
  }

  export type purchasesUpdateWithWhereUniqueWithoutBasesInput = {
    where: purchasesWhereUniqueInput
    data: XOR<purchasesUpdateWithoutBasesInput, purchasesUncheckedUpdateWithoutBasesInput>
  }

  export type purchasesUpdateManyWithWhereWithoutBasesInput = {
    where: purchasesScalarWhereInput
    data: XOR<purchasesUpdateManyMutationInput, purchasesUncheckedUpdateManyWithoutBasesInput>
  }

  export type transfersUpsertWithWhereUniqueWithoutBases_transfers_from_base_idTobasesInput = {
    where: transfersWhereUniqueInput
    update: XOR<transfersUpdateWithoutBases_transfers_from_base_idTobasesInput, transfersUncheckedUpdateWithoutBases_transfers_from_base_idTobasesInput>
    create: XOR<transfersCreateWithoutBases_transfers_from_base_idTobasesInput, transfersUncheckedCreateWithoutBases_transfers_from_base_idTobasesInput>
  }

  export type transfersUpdateWithWhereUniqueWithoutBases_transfers_from_base_idTobasesInput = {
    where: transfersWhereUniqueInput
    data: XOR<transfersUpdateWithoutBases_transfers_from_base_idTobasesInput, transfersUncheckedUpdateWithoutBases_transfers_from_base_idTobasesInput>
  }

  export type transfersUpdateManyWithWhereWithoutBases_transfers_from_base_idTobasesInput = {
    where: transfersScalarWhereInput
    data: XOR<transfersUpdateManyMutationInput, transfersUncheckedUpdateManyWithoutBases_transfers_from_base_idTobasesInput>
  }

  export type transfersScalarWhereInput = {
    AND?: transfersScalarWhereInput | transfersScalarWhereInput[]
    OR?: transfersScalarWhereInput[]
    NOT?: transfersScalarWhereInput | transfersScalarWhereInput[]
    id?: UuidFilter<"transfers"> | string
    transfer_number?: StringFilter<"transfers"> | string
    from_base_id?: UuidFilter<"transfers"> | string
    to_base_id?: UuidFilter<"transfers"> | string
    asset_name?: StringFilter<"transfers"> | string
    quantity?: IntFilter<"transfers"> | number
    transfer_date?: DateTimeFilter<"transfers"> | Date | string
    status?: StringFilter<"transfers"> | string
    approved_by?: UuidNullableFilter<"transfers"> | string | null
    approved_at?: DateTimeNullableFilter<"transfers"> | Date | string | null
    notes?: StringNullableFilter<"transfers"> | string | null
    created_by?: UuidFilter<"transfers"> | string
    created_at?: DateTimeNullableFilter<"transfers"> | Date | string | null
  }

  export type transfersUpsertWithWhereUniqueWithoutBases_transfers_to_base_idTobasesInput = {
    where: transfersWhereUniqueInput
    update: XOR<transfersUpdateWithoutBases_transfers_to_base_idTobasesInput, transfersUncheckedUpdateWithoutBases_transfers_to_base_idTobasesInput>
    create: XOR<transfersCreateWithoutBases_transfers_to_base_idTobasesInput, transfersUncheckedCreateWithoutBases_transfers_to_base_idTobasesInput>
  }

  export type transfersUpdateWithWhereUniqueWithoutBases_transfers_to_base_idTobasesInput = {
    where: transfersWhereUniqueInput
    data: XOR<transfersUpdateWithoutBases_transfers_to_base_idTobasesInput, transfersUncheckedUpdateWithoutBases_transfers_to_base_idTobasesInput>
  }

  export type transfersUpdateManyWithWhereWithoutBases_transfers_to_base_idTobasesInput = {
    where: transfersScalarWhereInput
    data: XOR<transfersUpdateManyMutationInput, transfersUncheckedUpdateManyWithoutBases_transfers_to_base_idTobasesInput>
  }

  export type usersUpsertWithWhereUniqueWithoutBases_users_base_idTobasesInput = {
    where: usersWhereUniqueInput
    update: XOR<usersUpdateWithoutBases_users_base_idTobasesInput, usersUncheckedUpdateWithoutBases_users_base_idTobasesInput>
    create: XOR<usersCreateWithoutBases_users_base_idTobasesInput, usersUncheckedCreateWithoutBases_users_base_idTobasesInput>
  }

  export type usersUpdateWithWhereUniqueWithoutBases_users_base_idTobasesInput = {
    where: usersWhereUniqueInput
    data: XOR<usersUpdateWithoutBases_users_base_idTobasesInput, usersUncheckedUpdateWithoutBases_users_base_idTobasesInput>
  }

  export type usersUpdateManyWithWhereWithoutBases_users_base_idTobasesInput = {
    where: usersScalarWhereInput
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyWithoutBases_users_base_idTobasesInput>
  }

  export type usersScalarWhereInput = {
    AND?: usersScalarWhereInput | usersScalarWhereInput[]
    OR?: usersScalarWhereInput[]
    NOT?: usersScalarWhereInput | usersScalarWhereInput[]
    id?: UuidFilter<"users"> | string
    username?: StringFilter<"users"> | string
    email?: StringFilter<"users"> | string
    password_hash?: StringFilter<"users"> | string
    first_name?: StringFilter<"users"> | string
    last_name?: StringFilter<"users"> | string
    role?: StringFilter<"users"> | string
    base_id?: UuidNullableFilter<"users"> | string | null
    is_active?: BoolNullableFilter<"users"> | boolean | null
    created_at?: DateTimeNullableFilter<"users"> | Date | string | null
  }

  export type usersCreateWithoutExpenditures_expenditures_authorized_byTousersInput = {
    id?: string
    username: string
    email: string
    password_hash: string
    first_name: string
    last_name: string
    role: string
    is_active?: boolean | null
    created_at?: Date | string | null
    assignments?: assignmentsCreateNestedManyWithoutUsersInput
    audit_logs?: audit_logsCreateNestedManyWithoutUsersInput
    bases_bases_commander_idTousers?: basesCreateNestedManyWithoutUsers_bases_commander_idTousersInput
    expenditures_expenditures_created_byTousers?: expendituresCreateNestedManyWithoutUsers_expenditures_created_byTousersInput
    purchases_purchases_approved_byTousers?: purchasesCreateNestedManyWithoutUsers_purchases_approved_byTousersInput
    purchases_purchases_created_byTousers?: purchasesCreateNestedManyWithoutUsers_purchases_created_byTousersInput
    transfers_transfers_approved_byTousers?: transfersCreateNestedManyWithoutUsers_transfers_approved_byTousersInput
    transfers_transfers_created_byTousers?: transfersCreateNestedManyWithoutUsers_transfers_created_byTousersInput
    bases_users_base_idTobases?: basesCreateNestedOneWithoutUsers_users_base_idTobasesInput
  }

  export type usersUncheckedCreateWithoutExpenditures_expenditures_authorized_byTousersInput = {
    id?: string
    username: string
    email: string
    password_hash: string
    first_name: string
    last_name: string
    role: string
    base_id?: string | null
    is_active?: boolean | null
    created_at?: Date | string | null
    assignments?: assignmentsUncheckedCreateNestedManyWithoutUsersInput
    audit_logs?: audit_logsUncheckedCreateNestedManyWithoutUsersInput
    bases_bases_commander_idTousers?: basesUncheckedCreateNestedManyWithoutUsers_bases_commander_idTousersInput
    expenditures_expenditures_created_byTousers?: expendituresUncheckedCreateNestedManyWithoutUsers_expenditures_created_byTousersInput
    purchases_purchases_approved_byTousers?: purchasesUncheckedCreateNestedManyWithoutUsers_purchases_approved_byTousersInput
    purchases_purchases_created_byTousers?: purchasesUncheckedCreateNestedManyWithoutUsers_purchases_created_byTousersInput
    transfers_transfers_approved_byTousers?: transfersUncheckedCreateNestedManyWithoutUsers_transfers_approved_byTousersInput
    transfers_transfers_created_byTousers?: transfersUncheckedCreateNestedManyWithoutUsers_transfers_created_byTousersInput
  }

  export type usersCreateOrConnectWithoutExpenditures_expenditures_authorized_byTousersInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutExpenditures_expenditures_authorized_byTousersInput, usersUncheckedCreateWithoutExpenditures_expenditures_authorized_byTousersInput>
  }

  export type basesCreateWithoutExpendituresInput = {
    id?: string
    name: string
    code: string
    location: string
    is_active?: boolean | null
    created_at?: Date | string | null
    assets?: assetsCreateNestedManyWithoutBasesInput
    assignments?: assignmentsCreateNestedManyWithoutBasesInput
    users_bases_commander_idTousers?: usersCreateNestedOneWithoutBases_bases_commander_idTousersInput
    personnel?: personnelCreateNestedManyWithoutBasesInput
    purchases?: purchasesCreateNestedManyWithoutBasesInput
    transfers_transfers_from_base_idTobases?: transfersCreateNestedManyWithoutBases_transfers_from_base_idTobasesInput
    transfers_transfers_to_base_idTobases?: transfersCreateNestedManyWithoutBases_transfers_to_base_idTobasesInput
    users_users_base_idTobases?: usersCreateNestedManyWithoutBases_users_base_idTobasesInput
  }

  export type basesUncheckedCreateWithoutExpendituresInput = {
    id?: string
    name: string
    code: string
    location: string
    commander_id?: string | null
    is_active?: boolean | null
    created_at?: Date | string | null
    assets?: assetsUncheckedCreateNestedManyWithoutBasesInput
    assignments?: assignmentsUncheckedCreateNestedManyWithoutBasesInput
    personnel?: personnelUncheckedCreateNestedManyWithoutBasesInput
    purchases?: purchasesUncheckedCreateNestedManyWithoutBasesInput
    transfers_transfers_from_base_idTobases?: transfersUncheckedCreateNestedManyWithoutBases_transfers_from_base_idTobasesInput
    transfers_transfers_to_base_idTobases?: transfersUncheckedCreateNestedManyWithoutBases_transfers_to_base_idTobasesInput
    users_users_base_idTobases?: usersUncheckedCreateNestedManyWithoutBases_users_base_idTobasesInput
  }

  export type basesCreateOrConnectWithoutExpendituresInput = {
    where: basesWhereUniqueInput
    create: XOR<basesCreateWithoutExpendituresInput, basesUncheckedCreateWithoutExpendituresInput>
  }

  export type usersCreateWithoutExpenditures_expenditures_created_byTousersInput = {
    id?: string
    username: string
    email: string
    password_hash: string
    first_name: string
    last_name: string
    role: string
    is_active?: boolean | null
    created_at?: Date | string | null
    assignments?: assignmentsCreateNestedManyWithoutUsersInput
    audit_logs?: audit_logsCreateNestedManyWithoutUsersInput
    bases_bases_commander_idTousers?: basesCreateNestedManyWithoutUsers_bases_commander_idTousersInput
    expenditures_expenditures_authorized_byTousers?: expendituresCreateNestedManyWithoutUsers_expenditures_authorized_byTousersInput
    purchases_purchases_approved_byTousers?: purchasesCreateNestedManyWithoutUsers_purchases_approved_byTousersInput
    purchases_purchases_created_byTousers?: purchasesCreateNestedManyWithoutUsers_purchases_created_byTousersInput
    transfers_transfers_approved_byTousers?: transfersCreateNestedManyWithoutUsers_transfers_approved_byTousersInput
    transfers_transfers_created_byTousers?: transfersCreateNestedManyWithoutUsers_transfers_created_byTousersInput
    bases_users_base_idTobases?: basesCreateNestedOneWithoutUsers_users_base_idTobasesInput
  }

  export type usersUncheckedCreateWithoutExpenditures_expenditures_created_byTousersInput = {
    id?: string
    username: string
    email: string
    password_hash: string
    first_name: string
    last_name: string
    role: string
    base_id?: string | null
    is_active?: boolean | null
    created_at?: Date | string | null
    assignments?: assignmentsUncheckedCreateNestedManyWithoutUsersInput
    audit_logs?: audit_logsUncheckedCreateNestedManyWithoutUsersInput
    bases_bases_commander_idTousers?: basesUncheckedCreateNestedManyWithoutUsers_bases_commander_idTousersInput
    expenditures_expenditures_authorized_byTousers?: expendituresUncheckedCreateNestedManyWithoutUsers_expenditures_authorized_byTousersInput
    purchases_purchases_approved_byTousers?: purchasesUncheckedCreateNestedManyWithoutUsers_purchases_approved_byTousersInput
    purchases_purchases_created_byTousers?: purchasesUncheckedCreateNestedManyWithoutUsers_purchases_created_byTousersInput
    transfers_transfers_approved_byTousers?: transfersUncheckedCreateNestedManyWithoutUsers_transfers_approved_byTousersInput
    transfers_transfers_created_byTousers?: transfersUncheckedCreateNestedManyWithoutUsers_transfers_created_byTousersInput
  }

  export type usersCreateOrConnectWithoutExpenditures_expenditures_created_byTousersInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutExpenditures_expenditures_created_byTousersInput, usersUncheckedCreateWithoutExpenditures_expenditures_created_byTousersInput>
  }

  export type personnelCreateWithoutExpendituresInput = {
    id?: string
    first_name: string
    last_name: string
    rank: string
    email?: string | null
    phone?: string | null
    department?: string | null
    is_active?: boolean | null
    created_at?: Date | string | null
    assignments?: assignmentsCreateNestedManyWithoutPersonnelInput
    bases: basesCreateNestedOneWithoutPersonnelInput
  }

  export type personnelUncheckedCreateWithoutExpendituresInput = {
    id?: string
    first_name: string
    last_name: string
    rank: string
    base_id: string
    email?: string | null
    phone?: string | null
    department?: string | null
    is_active?: boolean | null
    created_at?: Date | string | null
    assignments?: assignmentsUncheckedCreateNestedManyWithoutPersonnelInput
  }

  export type personnelCreateOrConnectWithoutExpendituresInput = {
    where: personnelWhereUniqueInput
    create: XOR<personnelCreateWithoutExpendituresInput, personnelUncheckedCreateWithoutExpendituresInput>
  }

  export type usersUpsertWithoutExpenditures_expenditures_authorized_byTousersInput = {
    update: XOR<usersUpdateWithoutExpenditures_expenditures_authorized_byTousersInput, usersUncheckedUpdateWithoutExpenditures_expenditures_authorized_byTousersInput>
    create: XOR<usersCreateWithoutExpenditures_expenditures_authorized_byTousersInput, usersUncheckedCreateWithoutExpenditures_expenditures_authorized_byTousersInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutExpenditures_expenditures_authorized_byTousersInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutExpenditures_expenditures_authorized_byTousersInput, usersUncheckedUpdateWithoutExpenditures_expenditures_authorized_byTousersInput>
  }

  export type usersUpdateWithoutExpenditures_expenditures_authorized_byTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignments?: assignmentsUpdateManyWithoutUsersNestedInput
    audit_logs?: audit_logsUpdateManyWithoutUsersNestedInput
    bases_bases_commander_idTousers?: basesUpdateManyWithoutUsers_bases_commander_idTousersNestedInput
    expenditures_expenditures_created_byTousers?: expendituresUpdateManyWithoutUsers_expenditures_created_byTousersNestedInput
    purchases_purchases_approved_byTousers?: purchasesUpdateManyWithoutUsers_purchases_approved_byTousersNestedInput
    purchases_purchases_created_byTousers?: purchasesUpdateManyWithoutUsers_purchases_created_byTousersNestedInput
    transfers_transfers_approved_byTousers?: transfersUpdateManyWithoutUsers_transfers_approved_byTousersNestedInput
    transfers_transfers_created_byTousers?: transfersUpdateManyWithoutUsers_transfers_created_byTousersNestedInput
    bases_users_base_idTobases?: basesUpdateOneWithoutUsers_users_base_idTobasesNestedInput
  }

  export type usersUncheckedUpdateWithoutExpenditures_expenditures_authorized_byTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    base_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignments?: assignmentsUncheckedUpdateManyWithoutUsersNestedInput
    audit_logs?: audit_logsUncheckedUpdateManyWithoutUsersNestedInput
    bases_bases_commander_idTousers?: basesUncheckedUpdateManyWithoutUsers_bases_commander_idTousersNestedInput
    expenditures_expenditures_created_byTousers?: expendituresUncheckedUpdateManyWithoutUsers_expenditures_created_byTousersNestedInput
    purchases_purchases_approved_byTousers?: purchasesUncheckedUpdateManyWithoutUsers_purchases_approved_byTousersNestedInput
    purchases_purchases_created_byTousers?: purchasesUncheckedUpdateManyWithoutUsers_purchases_created_byTousersNestedInput
    transfers_transfers_approved_byTousers?: transfersUncheckedUpdateManyWithoutUsers_transfers_approved_byTousersNestedInput
    transfers_transfers_created_byTousers?: transfersUncheckedUpdateManyWithoutUsers_transfers_created_byTousersNestedInput
  }

  export type basesUpsertWithoutExpendituresInput = {
    update: XOR<basesUpdateWithoutExpendituresInput, basesUncheckedUpdateWithoutExpendituresInput>
    create: XOR<basesCreateWithoutExpendituresInput, basesUncheckedCreateWithoutExpendituresInput>
    where?: basesWhereInput
  }

  export type basesUpdateToOneWithWhereWithoutExpendituresInput = {
    where?: basesWhereInput
    data: XOR<basesUpdateWithoutExpendituresInput, basesUncheckedUpdateWithoutExpendituresInput>
  }

  export type basesUpdateWithoutExpendituresInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assets?: assetsUpdateManyWithoutBasesNestedInput
    assignments?: assignmentsUpdateManyWithoutBasesNestedInput
    users_bases_commander_idTousers?: usersUpdateOneWithoutBases_bases_commander_idTousersNestedInput
    personnel?: personnelUpdateManyWithoutBasesNestedInput
    purchases?: purchasesUpdateManyWithoutBasesNestedInput
    transfers_transfers_from_base_idTobases?: transfersUpdateManyWithoutBases_transfers_from_base_idTobasesNestedInput
    transfers_transfers_to_base_idTobases?: transfersUpdateManyWithoutBases_transfers_to_base_idTobasesNestedInput
    users_users_base_idTobases?: usersUpdateManyWithoutBases_users_base_idTobasesNestedInput
  }

  export type basesUncheckedUpdateWithoutExpendituresInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    commander_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assets?: assetsUncheckedUpdateManyWithoutBasesNestedInput
    assignments?: assignmentsUncheckedUpdateManyWithoutBasesNestedInput
    personnel?: personnelUncheckedUpdateManyWithoutBasesNestedInput
    purchases?: purchasesUncheckedUpdateManyWithoutBasesNestedInput
    transfers_transfers_from_base_idTobases?: transfersUncheckedUpdateManyWithoutBases_transfers_from_base_idTobasesNestedInput
    transfers_transfers_to_base_idTobases?: transfersUncheckedUpdateManyWithoutBases_transfers_to_base_idTobasesNestedInput
    users_users_base_idTobases?: usersUncheckedUpdateManyWithoutBases_users_base_idTobasesNestedInput
  }

  export type usersUpsertWithoutExpenditures_expenditures_created_byTousersInput = {
    update: XOR<usersUpdateWithoutExpenditures_expenditures_created_byTousersInput, usersUncheckedUpdateWithoutExpenditures_expenditures_created_byTousersInput>
    create: XOR<usersCreateWithoutExpenditures_expenditures_created_byTousersInput, usersUncheckedCreateWithoutExpenditures_expenditures_created_byTousersInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutExpenditures_expenditures_created_byTousersInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutExpenditures_expenditures_created_byTousersInput, usersUncheckedUpdateWithoutExpenditures_expenditures_created_byTousersInput>
  }

  export type usersUpdateWithoutExpenditures_expenditures_created_byTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignments?: assignmentsUpdateManyWithoutUsersNestedInput
    audit_logs?: audit_logsUpdateManyWithoutUsersNestedInput
    bases_bases_commander_idTousers?: basesUpdateManyWithoutUsers_bases_commander_idTousersNestedInput
    expenditures_expenditures_authorized_byTousers?: expendituresUpdateManyWithoutUsers_expenditures_authorized_byTousersNestedInput
    purchases_purchases_approved_byTousers?: purchasesUpdateManyWithoutUsers_purchases_approved_byTousersNestedInput
    purchases_purchases_created_byTousers?: purchasesUpdateManyWithoutUsers_purchases_created_byTousersNestedInput
    transfers_transfers_approved_byTousers?: transfersUpdateManyWithoutUsers_transfers_approved_byTousersNestedInput
    transfers_transfers_created_byTousers?: transfersUpdateManyWithoutUsers_transfers_created_byTousersNestedInput
    bases_users_base_idTobases?: basesUpdateOneWithoutUsers_users_base_idTobasesNestedInput
  }

  export type usersUncheckedUpdateWithoutExpenditures_expenditures_created_byTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    base_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignments?: assignmentsUncheckedUpdateManyWithoutUsersNestedInput
    audit_logs?: audit_logsUncheckedUpdateManyWithoutUsersNestedInput
    bases_bases_commander_idTousers?: basesUncheckedUpdateManyWithoutUsers_bases_commander_idTousersNestedInput
    expenditures_expenditures_authorized_byTousers?: expendituresUncheckedUpdateManyWithoutUsers_expenditures_authorized_byTousersNestedInput
    purchases_purchases_approved_byTousers?: purchasesUncheckedUpdateManyWithoutUsers_purchases_approved_byTousersNestedInput
    purchases_purchases_created_byTousers?: purchasesUncheckedUpdateManyWithoutUsers_purchases_created_byTousersNestedInput
    transfers_transfers_approved_byTousers?: transfersUncheckedUpdateManyWithoutUsers_transfers_approved_byTousersNestedInput
    transfers_transfers_created_byTousers?: transfersUncheckedUpdateManyWithoutUsers_transfers_created_byTousersNestedInput
  }

  export type personnelUpsertWithoutExpendituresInput = {
    update: XOR<personnelUpdateWithoutExpendituresInput, personnelUncheckedUpdateWithoutExpendituresInput>
    create: XOR<personnelCreateWithoutExpendituresInput, personnelUncheckedCreateWithoutExpendituresInput>
    where?: personnelWhereInput
  }

  export type personnelUpdateToOneWithWhereWithoutExpendituresInput = {
    where?: personnelWhereInput
    data: XOR<personnelUpdateWithoutExpendituresInput, personnelUncheckedUpdateWithoutExpendituresInput>
  }

  export type personnelUpdateWithoutExpendituresInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    rank?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignments?: assignmentsUpdateManyWithoutPersonnelNestedInput
    bases?: basesUpdateOneRequiredWithoutPersonnelNestedInput
  }

  export type personnelUncheckedUpdateWithoutExpendituresInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    rank?: StringFieldUpdateOperationsInput | string
    base_id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignments?: assignmentsUncheckedUpdateManyWithoutPersonnelNestedInput
  }

  export type assignmentsCreateWithoutPersonnelInput = {
    id?: string
    asset_name: string
    quantity?: number
    expended_quantity?: number
    assignment_date: Date | string
    status?: string
    notes?: string | null
    created_at?: Date | string | null
    users: usersCreateNestedOneWithoutAssignmentsInput
    bases: basesCreateNestedOneWithoutAssignmentsInput
  }

  export type assignmentsUncheckedCreateWithoutPersonnelInput = {
    id?: string
    asset_name: string
    assigned_by: string
    base_id: string
    quantity?: number
    expended_quantity?: number
    assignment_date: Date | string
    status?: string
    notes?: string | null
    created_at?: Date | string | null
  }

  export type assignmentsCreateOrConnectWithoutPersonnelInput = {
    where: assignmentsWhereUniqueInput
    create: XOR<assignmentsCreateWithoutPersonnelInput, assignmentsUncheckedCreateWithoutPersonnelInput>
  }

  export type assignmentsCreateManyPersonnelInputEnvelope = {
    data: assignmentsCreateManyPersonnelInput | assignmentsCreateManyPersonnelInput[]
    skipDuplicates?: boolean
  }

  export type expendituresCreateWithoutPersonnelInput = {
    id?: string
    asset_name: string
    quantity: number
    expenditure_date: Date | string
    reason: string
    notes?: string | null
    created_at?: Date | string | null
    users_expenditures_authorized_byTousers?: usersCreateNestedOneWithoutExpenditures_expenditures_authorized_byTousersInput
    bases: basesCreateNestedOneWithoutExpendituresInput
    users_expenditures_created_byTousers: usersCreateNestedOneWithoutExpenditures_expenditures_created_byTousersInput
  }

  export type expendituresUncheckedCreateWithoutPersonnelInput = {
    id?: string
    asset_name: string
    base_id: string
    quantity: number
    expenditure_date: Date | string
    reason: string
    authorized_by?: string | null
    notes?: string | null
    created_by: string
    created_at?: Date | string | null
  }

  export type expendituresCreateOrConnectWithoutPersonnelInput = {
    where: expendituresWhereUniqueInput
    create: XOR<expendituresCreateWithoutPersonnelInput, expendituresUncheckedCreateWithoutPersonnelInput>
  }

  export type expendituresCreateManyPersonnelInputEnvelope = {
    data: expendituresCreateManyPersonnelInput | expendituresCreateManyPersonnelInput[]
    skipDuplicates?: boolean
  }

  export type basesCreateWithoutPersonnelInput = {
    id?: string
    name: string
    code: string
    location: string
    is_active?: boolean | null
    created_at?: Date | string | null
    assets?: assetsCreateNestedManyWithoutBasesInput
    assignments?: assignmentsCreateNestedManyWithoutBasesInput
    users_bases_commander_idTousers?: usersCreateNestedOneWithoutBases_bases_commander_idTousersInput
    expenditures?: expendituresCreateNestedManyWithoutBasesInput
    purchases?: purchasesCreateNestedManyWithoutBasesInput
    transfers_transfers_from_base_idTobases?: transfersCreateNestedManyWithoutBases_transfers_from_base_idTobasesInput
    transfers_transfers_to_base_idTobases?: transfersCreateNestedManyWithoutBases_transfers_to_base_idTobasesInput
    users_users_base_idTobases?: usersCreateNestedManyWithoutBases_users_base_idTobasesInput
  }

  export type basesUncheckedCreateWithoutPersonnelInput = {
    id?: string
    name: string
    code: string
    location: string
    commander_id?: string | null
    is_active?: boolean | null
    created_at?: Date | string | null
    assets?: assetsUncheckedCreateNestedManyWithoutBasesInput
    assignments?: assignmentsUncheckedCreateNestedManyWithoutBasesInput
    expenditures?: expendituresUncheckedCreateNestedManyWithoutBasesInput
    purchases?: purchasesUncheckedCreateNestedManyWithoutBasesInput
    transfers_transfers_from_base_idTobases?: transfersUncheckedCreateNestedManyWithoutBases_transfers_from_base_idTobasesInput
    transfers_transfers_to_base_idTobases?: transfersUncheckedCreateNestedManyWithoutBases_transfers_to_base_idTobasesInput
    users_users_base_idTobases?: usersUncheckedCreateNestedManyWithoutBases_users_base_idTobasesInput
  }

  export type basesCreateOrConnectWithoutPersonnelInput = {
    where: basesWhereUniqueInput
    create: XOR<basesCreateWithoutPersonnelInput, basesUncheckedCreateWithoutPersonnelInput>
  }

  export type assignmentsUpsertWithWhereUniqueWithoutPersonnelInput = {
    where: assignmentsWhereUniqueInput
    update: XOR<assignmentsUpdateWithoutPersonnelInput, assignmentsUncheckedUpdateWithoutPersonnelInput>
    create: XOR<assignmentsCreateWithoutPersonnelInput, assignmentsUncheckedCreateWithoutPersonnelInput>
  }

  export type assignmentsUpdateWithWhereUniqueWithoutPersonnelInput = {
    where: assignmentsWhereUniqueInput
    data: XOR<assignmentsUpdateWithoutPersonnelInput, assignmentsUncheckedUpdateWithoutPersonnelInput>
  }

  export type assignmentsUpdateManyWithWhereWithoutPersonnelInput = {
    where: assignmentsScalarWhereInput
    data: XOR<assignmentsUpdateManyMutationInput, assignmentsUncheckedUpdateManyWithoutPersonnelInput>
  }

  export type expendituresUpsertWithWhereUniqueWithoutPersonnelInput = {
    where: expendituresWhereUniqueInput
    update: XOR<expendituresUpdateWithoutPersonnelInput, expendituresUncheckedUpdateWithoutPersonnelInput>
    create: XOR<expendituresCreateWithoutPersonnelInput, expendituresUncheckedCreateWithoutPersonnelInput>
  }

  export type expendituresUpdateWithWhereUniqueWithoutPersonnelInput = {
    where: expendituresWhereUniqueInput
    data: XOR<expendituresUpdateWithoutPersonnelInput, expendituresUncheckedUpdateWithoutPersonnelInput>
  }

  export type expendituresUpdateManyWithWhereWithoutPersonnelInput = {
    where: expendituresScalarWhereInput
    data: XOR<expendituresUpdateManyMutationInput, expendituresUncheckedUpdateManyWithoutPersonnelInput>
  }

  export type basesUpsertWithoutPersonnelInput = {
    update: XOR<basesUpdateWithoutPersonnelInput, basesUncheckedUpdateWithoutPersonnelInput>
    create: XOR<basesCreateWithoutPersonnelInput, basesUncheckedCreateWithoutPersonnelInput>
    where?: basesWhereInput
  }

  export type basesUpdateToOneWithWhereWithoutPersonnelInput = {
    where?: basesWhereInput
    data: XOR<basesUpdateWithoutPersonnelInput, basesUncheckedUpdateWithoutPersonnelInput>
  }

  export type basesUpdateWithoutPersonnelInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assets?: assetsUpdateManyWithoutBasesNestedInput
    assignments?: assignmentsUpdateManyWithoutBasesNestedInput
    users_bases_commander_idTousers?: usersUpdateOneWithoutBases_bases_commander_idTousersNestedInput
    expenditures?: expendituresUpdateManyWithoutBasesNestedInput
    purchases?: purchasesUpdateManyWithoutBasesNestedInput
    transfers_transfers_from_base_idTobases?: transfersUpdateManyWithoutBases_transfers_from_base_idTobasesNestedInput
    transfers_transfers_to_base_idTobases?: transfersUpdateManyWithoutBases_transfers_to_base_idTobasesNestedInput
    users_users_base_idTobases?: usersUpdateManyWithoutBases_users_base_idTobasesNestedInput
  }

  export type basesUncheckedUpdateWithoutPersonnelInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    commander_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assets?: assetsUncheckedUpdateManyWithoutBasesNestedInput
    assignments?: assignmentsUncheckedUpdateManyWithoutBasesNestedInput
    expenditures?: expendituresUncheckedUpdateManyWithoutBasesNestedInput
    purchases?: purchasesUncheckedUpdateManyWithoutBasesNestedInput
    transfers_transfers_from_base_idTobases?: transfersUncheckedUpdateManyWithoutBases_transfers_from_base_idTobasesNestedInput
    transfers_transfers_to_base_idTobases?: transfersUncheckedUpdateManyWithoutBases_transfers_to_base_idTobasesNestedInput
    users_users_base_idTobases?: usersUncheckedUpdateManyWithoutBases_users_base_idTobasesNestedInput
  }

  export type usersCreateWithoutPurchases_purchases_approved_byTousersInput = {
    id?: string
    username: string
    email: string
    password_hash: string
    first_name: string
    last_name: string
    role: string
    is_active?: boolean | null
    created_at?: Date | string | null
    assignments?: assignmentsCreateNestedManyWithoutUsersInput
    audit_logs?: audit_logsCreateNestedManyWithoutUsersInput
    bases_bases_commander_idTousers?: basesCreateNestedManyWithoutUsers_bases_commander_idTousersInput
    expenditures_expenditures_authorized_byTousers?: expendituresCreateNestedManyWithoutUsers_expenditures_authorized_byTousersInput
    expenditures_expenditures_created_byTousers?: expendituresCreateNestedManyWithoutUsers_expenditures_created_byTousersInput
    purchases_purchases_created_byTousers?: purchasesCreateNestedManyWithoutUsers_purchases_created_byTousersInput
    transfers_transfers_approved_byTousers?: transfersCreateNestedManyWithoutUsers_transfers_approved_byTousersInput
    transfers_transfers_created_byTousers?: transfersCreateNestedManyWithoutUsers_transfers_created_byTousersInput
    bases_users_base_idTobases?: basesCreateNestedOneWithoutUsers_users_base_idTobasesInput
  }

  export type usersUncheckedCreateWithoutPurchases_purchases_approved_byTousersInput = {
    id?: string
    username: string
    email: string
    password_hash: string
    first_name: string
    last_name: string
    role: string
    base_id?: string | null
    is_active?: boolean | null
    created_at?: Date | string | null
    assignments?: assignmentsUncheckedCreateNestedManyWithoutUsersInput
    audit_logs?: audit_logsUncheckedCreateNestedManyWithoutUsersInput
    bases_bases_commander_idTousers?: basesUncheckedCreateNestedManyWithoutUsers_bases_commander_idTousersInput
    expenditures_expenditures_authorized_byTousers?: expendituresUncheckedCreateNestedManyWithoutUsers_expenditures_authorized_byTousersInput
    expenditures_expenditures_created_byTousers?: expendituresUncheckedCreateNestedManyWithoutUsers_expenditures_created_byTousersInput
    purchases_purchases_created_byTousers?: purchasesUncheckedCreateNestedManyWithoutUsers_purchases_created_byTousersInput
    transfers_transfers_approved_byTousers?: transfersUncheckedCreateNestedManyWithoutUsers_transfers_approved_byTousersInput
    transfers_transfers_created_byTousers?: transfersUncheckedCreateNestedManyWithoutUsers_transfers_created_byTousersInput
  }

  export type usersCreateOrConnectWithoutPurchases_purchases_approved_byTousersInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutPurchases_purchases_approved_byTousersInput, usersUncheckedCreateWithoutPurchases_purchases_approved_byTousersInput>
  }

  export type assetsCreateWithoutPurchasesInput = {
    id?: string
    name: string
    quantity?: number
    available_quantity?: number
    assigned_quantity?: number
    status?: string
    created_at?: Date | string | null
    bases: basesCreateNestedOneWithoutAssetsInput
  }

  export type assetsUncheckedCreateWithoutPurchasesInput = {
    id?: string
    name: string
    base_id: string
    quantity?: number
    available_quantity?: number
    assigned_quantity?: number
    status?: string
    created_at?: Date | string | null
  }

  export type assetsCreateOrConnectWithoutPurchasesInput = {
    where: assetsWhereUniqueInput
    create: XOR<assetsCreateWithoutPurchasesInput, assetsUncheckedCreateWithoutPurchasesInput>
  }

  export type basesCreateWithoutPurchasesInput = {
    id?: string
    name: string
    code: string
    location: string
    is_active?: boolean | null
    created_at?: Date | string | null
    assets?: assetsCreateNestedManyWithoutBasesInput
    assignments?: assignmentsCreateNestedManyWithoutBasesInput
    users_bases_commander_idTousers?: usersCreateNestedOneWithoutBases_bases_commander_idTousersInput
    expenditures?: expendituresCreateNestedManyWithoutBasesInput
    personnel?: personnelCreateNestedManyWithoutBasesInput
    transfers_transfers_from_base_idTobases?: transfersCreateNestedManyWithoutBases_transfers_from_base_idTobasesInput
    transfers_transfers_to_base_idTobases?: transfersCreateNestedManyWithoutBases_transfers_to_base_idTobasesInput
    users_users_base_idTobases?: usersCreateNestedManyWithoutBases_users_base_idTobasesInput
  }

  export type basesUncheckedCreateWithoutPurchasesInput = {
    id?: string
    name: string
    code: string
    location: string
    commander_id?: string | null
    is_active?: boolean | null
    created_at?: Date | string | null
    assets?: assetsUncheckedCreateNestedManyWithoutBasesInput
    assignments?: assignmentsUncheckedCreateNestedManyWithoutBasesInput
    expenditures?: expendituresUncheckedCreateNestedManyWithoutBasesInput
    personnel?: personnelUncheckedCreateNestedManyWithoutBasesInput
    transfers_transfers_from_base_idTobases?: transfersUncheckedCreateNestedManyWithoutBases_transfers_from_base_idTobasesInput
    transfers_transfers_to_base_idTobases?: transfersUncheckedCreateNestedManyWithoutBases_transfers_to_base_idTobasesInput
    users_users_base_idTobases?: usersUncheckedCreateNestedManyWithoutBases_users_base_idTobasesInput
  }

  export type basesCreateOrConnectWithoutPurchasesInput = {
    where: basesWhereUniqueInput
    create: XOR<basesCreateWithoutPurchasesInput, basesUncheckedCreateWithoutPurchasesInput>
  }

  export type usersCreateWithoutPurchases_purchases_created_byTousersInput = {
    id?: string
    username: string
    email: string
    password_hash: string
    first_name: string
    last_name: string
    role: string
    is_active?: boolean | null
    created_at?: Date | string | null
    assignments?: assignmentsCreateNestedManyWithoutUsersInput
    audit_logs?: audit_logsCreateNestedManyWithoutUsersInput
    bases_bases_commander_idTousers?: basesCreateNestedManyWithoutUsers_bases_commander_idTousersInput
    expenditures_expenditures_authorized_byTousers?: expendituresCreateNestedManyWithoutUsers_expenditures_authorized_byTousersInput
    expenditures_expenditures_created_byTousers?: expendituresCreateNestedManyWithoutUsers_expenditures_created_byTousersInput
    purchases_purchases_approved_byTousers?: purchasesCreateNestedManyWithoutUsers_purchases_approved_byTousersInput
    transfers_transfers_approved_byTousers?: transfersCreateNestedManyWithoutUsers_transfers_approved_byTousersInput
    transfers_transfers_created_byTousers?: transfersCreateNestedManyWithoutUsers_transfers_created_byTousersInput
    bases_users_base_idTobases?: basesCreateNestedOneWithoutUsers_users_base_idTobasesInput
  }

  export type usersUncheckedCreateWithoutPurchases_purchases_created_byTousersInput = {
    id?: string
    username: string
    email: string
    password_hash: string
    first_name: string
    last_name: string
    role: string
    base_id?: string | null
    is_active?: boolean | null
    created_at?: Date | string | null
    assignments?: assignmentsUncheckedCreateNestedManyWithoutUsersInput
    audit_logs?: audit_logsUncheckedCreateNestedManyWithoutUsersInput
    bases_bases_commander_idTousers?: basesUncheckedCreateNestedManyWithoutUsers_bases_commander_idTousersInput
    expenditures_expenditures_authorized_byTousers?: expendituresUncheckedCreateNestedManyWithoutUsers_expenditures_authorized_byTousersInput
    expenditures_expenditures_created_byTousers?: expendituresUncheckedCreateNestedManyWithoutUsers_expenditures_created_byTousersInput
    purchases_purchases_approved_byTousers?: purchasesUncheckedCreateNestedManyWithoutUsers_purchases_approved_byTousersInput
    transfers_transfers_approved_byTousers?: transfersUncheckedCreateNestedManyWithoutUsers_transfers_approved_byTousersInput
    transfers_transfers_created_byTousers?: transfersUncheckedCreateNestedManyWithoutUsers_transfers_created_byTousersInput
  }

  export type usersCreateOrConnectWithoutPurchases_purchases_created_byTousersInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutPurchases_purchases_created_byTousersInput, usersUncheckedCreateWithoutPurchases_purchases_created_byTousersInput>
  }

  export type usersUpsertWithoutPurchases_purchases_approved_byTousersInput = {
    update: XOR<usersUpdateWithoutPurchases_purchases_approved_byTousersInput, usersUncheckedUpdateWithoutPurchases_purchases_approved_byTousersInput>
    create: XOR<usersCreateWithoutPurchases_purchases_approved_byTousersInput, usersUncheckedCreateWithoutPurchases_purchases_approved_byTousersInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutPurchases_purchases_approved_byTousersInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutPurchases_purchases_approved_byTousersInput, usersUncheckedUpdateWithoutPurchases_purchases_approved_byTousersInput>
  }

  export type usersUpdateWithoutPurchases_purchases_approved_byTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignments?: assignmentsUpdateManyWithoutUsersNestedInput
    audit_logs?: audit_logsUpdateManyWithoutUsersNestedInput
    bases_bases_commander_idTousers?: basesUpdateManyWithoutUsers_bases_commander_idTousersNestedInput
    expenditures_expenditures_authorized_byTousers?: expendituresUpdateManyWithoutUsers_expenditures_authorized_byTousersNestedInput
    expenditures_expenditures_created_byTousers?: expendituresUpdateManyWithoutUsers_expenditures_created_byTousersNestedInput
    purchases_purchases_created_byTousers?: purchasesUpdateManyWithoutUsers_purchases_created_byTousersNestedInput
    transfers_transfers_approved_byTousers?: transfersUpdateManyWithoutUsers_transfers_approved_byTousersNestedInput
    transfers_transfers_created_byTousers?: transfersUpdateManyWithoutUsers_transfers_created_byTousersNestedInput
    bases_users_base_idTobases?: basesUpdateOneWithoutUsers_users_base_idTobasesNestedInput
  }

  export type usersUncheckedUpdateWithoutPurchases_purchases_approved_byTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    base_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignments?: assignmentsUncheckedUpdateManyWithoutUsersNestedInput
    audit_logs?: audit_logsUncheckedUpdateManyWithoutUsersNestedInput
    bases_bases_commander_idTousers?: basesUncheckedUpdateManyWithoutUsers_bases_commander_idTousersNestedInput
    expenditures_expenditures_authorized_byTousers?: expendituresUncheckedUpdateManyWithoutUsers_expenditures_authorized_byTousersNestedInput
    expenditures_expenditures_created_byTousers?: expendituresUncheckedUpdateManyWithoutUsers_expenditures_created_byTousersNestedInput
    purchases_purchases_created_byTousers?: purchasesUncheckedUpdateManyWithoutUsers_purchases_created_byTousersNestedInput
    transfers_transfers_approved_byTousers?: transfersUncheckedUpdateManyWithoutUsers_transfers_approved_byTousersNestedInput
    transfers_transfers_created_byTousers?: transfersUncheckedUpdateManyWithoutUsers_transfers_created_byTousersNestedInput
  }

  export type assetsUpsertWithoutPurchasesInput = {
    update: XOR<assetsUpdateWithoutPurchasesInput, assetsUncheckedUpdateWithoutPurchasesInput>
    create: XOR<assetsCreateWithoutPurchasesInput, assetsUncheckedCreateWithoutPurchasesInput>
    where?: assetsWhereInput
  }

  export type assetsUpdateToOneWithWhereWithoutPurchasesInput = {
    where?: assetsWhereInput
    data: XOR<assetsUpdateWithoutPurchasesInput, assetsUncheckedUpdateWithoutPurchasesInput>
  }

  export type assetsUpdateWithoutPurchasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    available_quantity?: IntFieldUpdateOperationsInput | number
    assigned_quantity?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bases?: basesUpdateOneRequiredWithoutAssetsNestedInput
  }

  export type assetsUncheckedUpdateWithoutPurchasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    base_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    available_quantity?: IntFieldUpdateOperationsInput | number
    assigned_quantity?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type basesUpsertWithoutPurchasesInput = {
    update: XOR<basesUpdateWithoutPurchasesInput, basesUncheckedUpdateWithoutPurchasesInput>
    create: XOR<basesCreateWithoutPurchasesInput, basesUncheckedCreateWithoutPurchasesInput>
    where?: basesWhereInput
  }

  export type basesUpdateToOneWithWhereWithoutPurchasesInput = {
    where?: basesWhereInput
    data: XOR<basesUpdateWithoutPurchasesInput, basesUncheckedUpdateWithoutPurchasesInput>
  }

  export type basesUpdateWithoutPurchasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assets?: assetsUpdateManyWithoutBasesNestedInput
    assignments?: assignmentsUpdateManyWithoutBasesNestedInput
    users_bases_commander_idTousers?: usersUpdateOneWithoutBases_bases_commander_idTousersNestedInput
    expenditures?: expendituresUpdateManyWithoutBasesNestedInput
    personnel?: personnelUpdateManyWithoutBasesNestedInput
    transfers_transfers_from_base_idTobases?: transfersUpdateManyWithoutBases_transfers_from_base_idTobasesNestedInput
    transfers_transfers_to_base_idTobases?: transfersUpdateManyWithoutBases_transfers_to_base_idTobasesNestedInput
    users_users_base_idTobases?: usersUpdateManyWithoutBases_users_base_idTobasesNestedInput
  }

  export type basesUncheckedUpdateWithoutPurchasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    commander_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assets?: assetsUncheckedUpdateManyWithoutBasesNestedInput
    assignments?: assignmentsUncheckedUpdateManyWithoutBasesNestedInput
    expenditures?: expendituresUncheckedUpdateManyWithoutBasesNestedInput
    personnel?: personnelUncheckedUpdateManyWithoutBasesNestedInput
    transfers_transfers_from_base_idTobases?: transfersUncheckedUpdateManyWithoutBases_transfers_from_base_idTobasesNestedInput
    transfers_transfers_to_base_idTobases?: transfersUncheckedUpdateManyWithoutBases_transfers_to_base_idTobasesNestedInput
    users_users_base_idTobases?: usersUncheckedUpdateManyWithoutBases_users_base_idTobasesNestedInput
  }

  export type usersUpsertWithoutPurchases_purchases_created_byTousersInput = {
    update: XOR<usersUpdateWithoutPurchases_purchases_created_byTousersInput, usersUncheckedUpdateWithoutPurchases_purchases_created_byTousersInput>
    create: XOR<usersCreateWithoutPurchases_purchases_created_byTousersInput, usersUncheckedCreateWithoutPurchases_purchases_created_byTousersInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutPurchases_purchases_created_byTousersInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutPurchases_purchases_created_byTousersInput, usersUncheckedUpdateWithoutPurchases_purchases_created_byTousersInput>
  }

  export type usersUpdateWithoutPurchases_purchases_created_byTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignments?: assignmentsUpdateManyWithoutUsersNestedInput
    audit_logs?: audit_logsUpdateManyWithoutUsersNestedInput
    bases_bases_commander_idTousers?: basesUpdateManyWithoutUsers_bases_commander_idTousersNestedInput
    expenditures_expenditures_authorized_byTousers?: expendituresUpdateManyWithoutUsers_expenditures_authorized_byTousersNestedInput
    expenditures_expenditures_created_byTousers?: expendituresUpdateManyWithoutUsers_expenditures_created_byTousersNestedInput
    purchases_purchases_approved_byTousers?: purchasesUpdateManyWithoutUsers_purchases_approved_byTousersNestedInput
    transfers_transfers_approved_byTousers?: transfersUpdateManyWithoutUsers_transfers_approved_byTousersNestedInput
    transfers_transfers_created_byTousers?: transfersUpdateManyWithoutUsers_transfers_created_byTousersNestedInput
    bases_users_base_idTobases?: basesUpdateOneWithoutUsers_users_base_idTobasesNestedInput
  }

  export type usersUncheckedUpdateWithoutPurchases_purchases_created_byTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    base_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignments?: assignmentsUncheckedUpdateManyWithoutUsersNestedInput
    audit_logs?: audit_logsUncheckedUpdateManyWithoutUsersNestedInput
    bases_bases_commander_idTousers?: basesUncheckedUpdateManyWithoutUsers_bases_commander_idTousersNestedInput
    expenditures_expenditures_authorized_byTousers?: expendituresUncheckedUpdateManyWithoutUsers_expenditures_authorized_byTousersNestedInput
    expenditures_expenditures_created_byTousers?: expendituresUncheckedUpdateManyWithoutUsers_expenditures_created_byTousersNestedInput
    purchases_purchases_approved_byTousers?: purchasesUncheckedUpdateManyWithoutUsers_purchases_approved_byTousersNestedInput
    transfers_transfers_approved_byTousers?: transfersUncheckedUpdateManyWithoutUsers_transfers_approved_byTousersNestedInput
    transfers_transfers_created_byTousers?: transfersUncheckedUpdateManyWithoutUsers_transfers_created_byTousersNestedInput
  }

  export type usersCreateWithoutTransfers_transfers_approved_byTousersInput = {
    id?: string
    username: string
    email: string
    password_hash: string
    first_name: string
    last_name: string
    role: string
    is_active?: boolean | null
    created_at?: Date | string | null
    assignments?: assignmentsCreateNestedManyWithoutUsersInput
    audit_logs?: audit_logsCreateNestedManyWithoutUsersInput
    bases_bases_commander_idTousers?: basesCreateNestedManyWithoutUsers_bases_commander_idTousersInput
    expenditures_expenditures_authorized_byTousers?: expendituresCreateNestedManyWithoutUsers_expenditures_authorized_byTousersInput
    expenditures_expenditures_created_byTousers?: expendituresCreateNestedManyWithoutUsers_expenditures_created_byTousersInput
    purchases_purchases_approved_byTousers?: purchasesCreateNestedManyWithoutUsers_purchases_approved_byTousersInput
    purchases_purchases_created_byTousers?: purchasesCreateNestedManyWithoutUsers_purchases_created_byTousersInput
    transfers_transfers_created_byTousers?: transfersCreateNestedManyWithoutUsers_transfers_created_byTousersInput
    bases_users_base_idTobases?: basesCreateNestedOneWithoutUsers_users_base_idTobasesInput
  }

  export type usersUncheckedCreateWithoutTransfers_transfers_approved_byTousersInput = {
    id?: string
    username: string
    email: string
    password_hash: string
    first_name: string
    last_name: string
    role: string
    base_id?: string | null
    is_active?: boolean | null
    created_at?: Date | string | null
    assignments?: assignmentsUncheckedCreateNestedManyWithoutUsersInput
    audit_logs?: audit_logsUncheckedCreateNestedManyWithoutUsersInput
    bases_bases_commander_idTousers?: basesUncheckedCreateNestedManyWithoutUsers_bases_commander_idTousersInput
    expenditures_expenditures_authorized_byTousers?: expendituresUncheckedCreateNestedManyWithoutUsers_expenditures_authorized_byTousersInput
    expenditures_expenditures_created_byTousers?: expendituresUncheckedCreateNestedManyWithoutUsers_expenditures_created_byTousersInput
    purchases_purchases_approved_byTousers?: purchasesUncheckedCreateNestedManyWithoutUsers_purchases_approved_byTousersInput
    purchases_purchases_created_byTousers?: purchasesUncheckedCreateNestedManyWithoutUsers_purchases_created_byTousersInput
    transfers_transfers_created_byTousers?: transfersUncheckedCreateNestedManyWithoutUsers_transfers_created_byTousersInput
  }

  export type usersCreateOrConnectWithoutTransfers_transfers_approved_byTousersInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutTransfers_transfers_approved_byTousersInput, usersUncheckedCreateWithoutTransfers_transfers_approved_byTousersInput>
  }

  export type usersCreateWithoutTransfers_transfers_created_byTousersInput = {
    id?: string
    username: string
    email: string
    password_hash: string
    first_name: string
    last_name: string
    role: string
    is_active?: boolean | null
    created_at?: Date | string | null
    assignments?: assignmentsCreateNestedManyWithoutUsersInput
    audit_logs?: audit_logsCreateNestedManyWithoutUsersInput
    bases_bases_commander_idTousers?: basesCreateNestedManyWithoutUsers_bases_commander_idTousersInput
    expenditures_expenditures_authorized_byTousers?: expendituresCreateNestedManyWithoutUsers_expenditures_authorized_byTousersInput
    expenditures_expenditures_created_byTousers?: expendituresCreateNestedManyWithoutUsers_expenditures_created_byTousersInput
    purchases_purchases_approved_byTousers?: purchasesCreateNestedManyWithoutUsers_purchases_approved_byTousersInput
    purchases_purchases_created_byTousers?: purchasesCreateNestedManyWithoutUsers_purchases_created_byTousersInput
    transfers_transfers_approved_byTousers?: transfersCreateNestedManyWithoutUsers_transfers_approved_byTousersInput
    bases_users_base_idTobases?: basesCreateNestedOneWithoutUsers_users_base_idTobasesInput
  }

  export type usersUncheckedCreateWithoutTransfers_transfers_created_byTousersInput = {
    id?: string
    username: string
    email: string
    password_hash: string
    first_name: string
    last_name: string
    role: string
    base_id?: string | null
    is_active?: boolean | null
    created_at?: Date | string | null
    assignments?: assignmentsUncheckedCreateNestedManyWithoutUsersInput
    audit_logs?: audit_logsUncheckedCreateNestedManyWithoutUsersInput
    bases_bases_commander_idTousers?: basesUncheckedCreateNestedManyWithoutUsers_bases_commander_idTousersInput
    expenditures_expenditures_authorized_byTousers?: expendituresUncheckedCreateNestedManyWithoutUsers_expenditures_authorized_byTousersInput
    expenditures_expenditures_created_byTousers?: expendituresUncheckedCreateNestedManyWithoutUsers_expenditures_created_byTousersInput
    purchases_purchases_approved_byTousers?: purchasesUncheckedCreateNestedManyWithoutUsers_purchases_approved_byTousersInput
    purchases_purchases_created_byTousers?: purchasesUncheckedCreateNestedManyWithoutUsers_purchases_created_byTousersInput
    transfers_transfers_approved_byTousers?: transfersUncheckedCreateNestedManyWithoutUsers_transfers_approved_byTousersInput
  }

  export type usersCreateOrConnectWithoutTransfers_transfers_created_byTousersInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutTransfers_transfers_created_byTousersInput, usersUncheckedCreateWithoutTransfers_transfers_created_byTousersInput>
  }

  export type basesCreateWithoutTransfers_transfers_from_base_idTobasesInput = {
    id?: string
    name: string
    code: string
    location: string
    is_active?: boolean | null
    created_at?: Date | string | null
    assets?: assetsCreateNestedManyWithoutBasesInput
    assignments?: assignmentsCreateNestedManyWithoutBasesInput
    users_bases_commander_idTousers?: usersCreateNestedOneWithoutBases_bases_commander_idTousersInput
    expenditures?: expendituresCreateNestedManyWithoutBasesInput
    personnel?: personnelCreateNestedManyWithoutBasesInput
    purchases?: purchasesCreateNestedManyWithoutBasesInput
    transfers_transfers_to_base_idTobases?: transfersCreateNestedManyWithoutBases_transfers_to_base_idTobasesInput
    users_users_base_idTobases?: usersCreateNestedManyWithoutBases_users_base_idTobasesInput
  }

  export type basesUncheckedCreateWithoutTransfers_transfers_from_base_idTobasesInput = {
    id?: string
    name: string
    code: string
    location: string
    commander_id?: string | null
    is_active?: boolean | null
    created_at?: Date | string | null
    assets?: assetsUncheckedCreateNestedManyWithoutBasesInput
    assignments?: assignmentsUncheckedCreateNestedManyWithoutBasesInput
    expenditures?: expendituresUncheckedCreateNestedManyWithoutBasesInput
    personnel?: personnelUncheckedCreateNestedManyWithoutBasesInput
    purchases?: purchasesUncheckedCreateNestedManyWithoutBasesInput
    transfers_transfers_to_base_idTobases?: transfersUncheckedCreateNestedManyWithoutBases_transfers_to_base_idTobasesInput
    users_users_base_idTobases?: usersUncheckedCreateNestedManyWithoutBases_users_base_idTobasesInput
  }

  export type basesCreateOrConnectWithoutTransfers_transfers_from_base_idTobasesInput = {
    where: basesWhereUniqueInput
    create: XOR<basesCreateWithoutTransfers_transfers_from_base_idTobasesInput, basesUncheckedCreateWithoutTransfers_transfers_from_base_idTobasesInput>
  }

  export type basesCreateWithoutTransfers_transfers_to_base_idTobasesInput = {
    id?: string
    name: string
    code: string
    location: string
    is_active?: boolean | null
    created_at?: Date | string | null
    assets?: assetsCreateNestedManyWithoutBasesInput
    assignments?: assignmentsCreateNestedManyWithoutBasesInput
    users_bases_commander_idTousers?: usersCreateNestedOneWithoutBases_bases_commander_idTousersInput
    expenditures?: expendituresCreateNestedManyWithoutBasesInput
    personnel?: personnelCreateNestedManyWithoutBasesInput
    purchases?: purchasesCreateNestedManyWithoutBasesInput
    transfers_transfers_from_base_idTobases?: transfersCreateNestedManyWithoutBases_transfers_from_base_idTobasesInput
    users_users_base_idTobases?: usersCreateNestedManyWithoutBases_users_base_idTobasesInput
  }

  export type basesUncheckedCreateWithoutTransfers_transfers_to_base_idTobasesInput = {
    id?: string
    name: string
    code: string
    location: string
    commander_id?: string | null
    is_active?: boolean | null
    created_at?: Date | string | null
    assets?: assetsUncheckedCreateNestedManyWithoutBasesInput
    assignments?: assignmentsUncheckedCreateNestedManyWithoutBasesInput
    expenditures?: expendituresUncheckedCreateNestedManyWithoutBasesInput
    personnel?: personnelUncheckedCreateNestedManyWithoutBasesInput
    purchases?: purchasesUncheckedCreateNestedManyWithoutBasesInput
    transfers_transfers_from_base_idTobases?: transfersUncheckedCreateNestedManyWithoutBases_transfers_from_base_idTobasesInput
    users_users_base_idTobases?: usersUncheckedCreateNestedManyWithoutBases_users_base_idTobasesInput
  }

  export type basesCreateOrConnectWithoutTransfers_transfers_to_base_idTobasesInput = {
    where: basesWhereUniqueInput
    create: XOR<basesCreateWithoutTransfers_transfers_to_base_idTobasesInput, basesUncheckedCreateWithoutTransfers_transfers_to_base_idTobasesInput>
  }

  export type usersUpsertWithoutTransfers_transfers_approved_byTousersInput = {
    update: XOR<usersUpdateWithoutTransfers_transfers_approved_byTousersInput, usersUncheckedUpdateWithoutTransfers_transfers_approved_byTousersInput>
    create: XOR<usersCreateWithoutTransfers_transfers_approved_byTousersInput, usersUncheckedCreateWithoutTransfers_transfers_approved_byTousersInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutTransfers_transfers_approved_byTousersInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutTransfers_transfers_approved_byTousersInput, usersUncheckedUpdateWithoutTransfers_transfers_approved_byTousersInput>
  }

  export type usersUpdateWithoutTransfers_transfers_approved_byTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignments?: assignmentsUpdateManyWithoutUsersNestedInput
    audit_logs?: audit_logsUpdateManyWithoutUsersNestedInput
    bases_bases_commander_idTousers?: basesUpdateManyWithoutUsers_bases_commander_idTousersNestedInput
    expenditures_expenditures_authorized_byTousers?: expendituresUpdateManyWithoutUsers_expenditures_authorized_byTousersNestedInput
    expenditures_expenditures_created_byTousers?: expendituresUpdateManyWithoutUsers_expenditures_created_byTousersNestedInput
    purchases_purchases_approved_byTousers?: purchasesUpdateManyWithoutUsers_purchases_approved_byTousersNestedInput
    purchases_purchases_created_byTousers?: purchasesUpdateManyWithoutUsers_purchases_created_byTousersNestedInput
    transfers_transfers_created_byTousers?: transfersUpdateManyWithoutUsers_transfers_created_byTousersNestedInput
    bases_users_base_idTobases?: basesUpdateOneWithoutUsers_users_base_idTobasesNestedInput
  }

  export type usersUncheckedUpdateWithoutTransfers_transfers_approved_byTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    base_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignments?: assignmentsUncheckedUpdateManyWithoutUsersNestedInput
    audit_logs?: audit_logsUncheckedUpdateManyWithoutUsersNestedInput
    bases_bases_commander_idTousers?: basesUncheckedUpdateManyWithoutUsers_bases_commander_idTousersNestedInput
    expenditures_expenditures_authorized_byTousers?: expendituresUncheckedUpdateManyWithoutUsers_expenditures_authorized_byTousersNestedInput
    expenditures_expenditures_created_byTousers?: expendituresUncheckedUpdateManyWithoutUsers_expenditures_created_byTousersNestedInput
    purchases_purchases_approved_byTousers?: purchasesUncheckedUpdateManyWithoutUsers_purchases_approved_byTousersNestedInput
    purchases_purchases_created_byTousers?: purchasesUncheckedUpdateManyWithoutUsers_purchases_created_byTousersNestedInput
    transfers_transfers_created_byTousers?: transfersUncheckedUpdateManyWithoutUsers_transfers_created_byTousersNestedInput
  }

  export type usersUpsertWithoutTransfers_transfers_created_byTousersInput = {
    update: XOR<usersUpdateWithoutTransfers_transfers_created_byTousersInput, usersUncheckedUpdateWithoutTransfers_transfers_created_byTousersInput>
    create: XOR<usersCreateWithoutTransfers_transfers_created_byTousersInput, usersUncheckedCreateWithoutTransfers_transfers_created_byTousersInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutTransfers_transfers_created_byTousersInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutTransfers_transfers_created_byTousersInput, usersUncheckedUpdateWithoutTransfers_transfers_created_byTousersInput>
  }

  export type usersUpdateWithoutTransfers_transfers_created_byTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignments?: assignmentsUpdateManyWithoutUsersNestedInput
    audit_logs?: audit_logsUpdateManyWithoutUsersNestedInput
    bases_bases_commander_idTousers?: basesUpdateManyWithoutUsers_bases_commander_idTousersNestedInput
    expenditures_expenditures_authorized_byTousers?: expendituresUpdateManyWithoutUsers_expenditures_authorized_byTousersNestedInput
    expenditures_expenditures_created_byTousers?: expendituresUpdateManyWithoutUsers_expenditures_created_byTousersNestedInput
    purchases_purchases_approved_byTousers?: purchasesUpdateManyWithoutUsers_purchases_approved_byTousersNestedInput
    purchases_purchases_created_byTousers?: purchasesUpdateManyWithoutUsers_purchases_created_byTousersNestedInput
    transfers_transfers_approved_byTousers?: transfersUpdateManyWithoutUsers_transfers_approved_byTousersNestedInput
    bases_users_base_idTobases?: basesUpdateOneWithoutUsers_users_base_idTobasesNestedInput
  }

  export type usersUncheckedUpdateWithoutTransfers_transfers_created_byTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    base_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignments?: assignmentsUncheckedUpdateManyWithoutUsersNestedInput
    audit_logs?: audit_logsUncheckedUpdateManyWithoutUsersNestedInput
    bases_bases_commander_idTousers?: basesUncheckedUpdateManyWithoutUsers_bases_commander_idTousersNestedInput
    expenditures_expenditures_authorized_byTousers?: expendituresUncheckedUpdateManyWithoutUsers_expenditures_authorized_byTousersNestedInput
    expenditures_expenditures_created_byTousers?: expendituresUncheckedUpdateManyWithoutUsers_expenditures_created_byTousersNestedInput
    purchases_purchases_approved_byTousers?: purchasesUncheckedUpdateManyWithoutUsers_purchases_approved_byTousersNestedInput
    purchases_purchases_created_byTousers?: purchasesUncheckedUpdateManyWithoutUsers_purchases_created_byTousersNestedInput
    transfers_transfers_approved_byTousers?: transfersUncheckedUpdateManyWithoutUsers_transfers_approved_byTousersNestedInput
  }

  export type basesUpsertWithoutTransfers_transfers_from_base_idTobasesInput = {
    update: XOR<basesUpdateWithoutTransfers_transfers_from_base_idTobasesInput, basesUncheckedUpdateWithoutTransfers_transfers_from_base_idTobasesInput>
    create: XOR<basesCreateWithoutTransfers_transfers_from_base_idTobasesInput, basesUncheckedCreateWithoutTransfers_transfers_from_base_idTobasesInput>
    where?: basesWhereInput
  }

  export type basesUpdateToOneWithWhereWithoutTransfers_transfers_from_base_idTobasesInput = {
    where?: basesWhereInput
    data: XOR<basesUpdateWithoutTransfers_transfers_from_base_idTobasesInput, basesUncheckedUpdateWithoutTransfers_transfers_from_base_idTobasesInput>
  }

  export type basesUpdateWithoutTransfers_transfers_from_base_idTobasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assets?: assetsUpdateManyWithoutBasesNestedInput
    assignments?: assignmentsUpdateManyWithoutBasesNestedInput
    users_bases_commander_idTousers?: usersUpdateOneWithoutBases_bases_commander_idTousersNestedInput
    expenditures?: expendituresUpdateManyWithoutBasesNestedInput
    personnel?: personnelUpdateManyWithoutBasesNestedInput
    purchases?: purchasesUpdateManyWithoutBasesNestedInput
    transfers_transfers_to_base_idTobases?: transfersUpdateManyWithoutBases_transfers_to_base_idTobasesNestedInput
    users_users_base_idTobases?: usersUpdateManyWithoutBases_users_base_idTobasesNestedInput
  }

  export type basesUncheckedUpdateWithoutTransfers_transfers_from_base_idTobasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    commander_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assets?: assetsUncheckedUpdateManyWithoutBasesNestedInput
    assignments?: assignmentsUncheckedUpdateManyWithoutBasesNestedInput
    expenditures?: expendituresUncheckedUpdateManyWithoutBasesNestedInput
    personnel?: personnelUncheckedUpdateManyWithoutBasesNestedInput
    purchases?: purchasesUncheckedUpdateManyWithoutBasesNestedInput
    transfers_transfers_to_base_idTobases?: transfersUncheckedUpdateManyWithoutBases_transfers_to_base_idTobasesNestedInput
    users_users_base_idTobases?: usersUncheckedUpdateManyWithoutBases_users_base_idTobasesNestedInput
  }

  export type basesUpsertWithoutTransfers_transfers_to_base_idTobasesInput = {
    update: XOR<basesUpdateWithoutTransfers_transfers_to_base_idTobasesInput, basesUncheckedUpdateWithoutTransfers_transfers_to_base_idTobasesInput>
    create: XOR<basesCreateWithoutTransfers_transfers_to_base_idTobasesInput, basesUncheckedCreateWithoutTransfers_transfers_to_base_idTobasesInput>
    where?: basesWhereInput
  }

  export type basesUpdateToOneWithWhereWithoutTransfers_transfers_to_base_idTobasesInput = {
    where?: basesWhereInput
    data: XOR<basesUpdateWithoutTransfers_transfers_to_base_idTobasesInput, basesUncheckedUpdateWithoutTransfers_transfers_to_base_idTobasesInput>
  }

  export type basesUpdateWithoutTransfers_transfers_to_base_idTobasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assets?: assetsUpdateManyWithoutBasesNestedInput
    assignments?: assignmentsUpdateManyWithoutBasesNestedInput
    users_bases_commander_idTousers?: usersUpdateOneWithoutBases_bases_commander_idTousersNestedInput
    expenditures?: expendituresUpdateManyWithoutBasesNestedInput
    personnel?: personnelUpdateManyWithoutBasesNestedInput
    purchases?: purchasesUpdateManyWithoutBasesNestedInput
    transfers_transfers_from_base_idTobases?: transfersUpdateManyWithoutBases_transfers_from_base_idTobasesNestedInput
    users_users_base_idTobases?: usersUpdateManyWithoutBases_users_base_idTobasesNestedInput
  }

  export type basesUncheckedUpdateWithoutTransfers_transfers_to_base_idTobasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    commander_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assets?: assetsUncheckedUpdateManyWithoutBasesNestedInput
    assignments?: assignmentsUncheckedUpdateManyWithoutBasesNestedInput
    expenditures?: expendituresUncheckedUpdateManyWithoutBasesNestedInput
    personnel?: personnelUncheckedUpdateManyWithoutBasesNestedInput
    purchases?: purchasesUncheckedUpdateManyWithoutBasesNestedInput
    transfers_transfers_from_base_idTobases?: transfersUncheckedUpdateManyWithoutBases_transfers_from_base_idTobasesNestedInput
    users_users_base_idTobases?: usersUncheckedUpdateManyWithoutBases_users_base_idTobasesNestedInput
  }

  export type assignmentsCreateWithoutUsersInput = {
    id?: string
    asset_name: string
    quantity?: number
    expended_quantity?: number
    assignment_date: Date | string
    status?: string
    notes?: string | null
    created_at?: Date | string | null
    personnel: personnelCreateNestedOneWithoutAssignmentsInput
    bases: basesCreateNestedOneWithoutAssignmentsInput
  }

  export type assignmentsUncheckedCreateWithoutUsersInput = {
    id?: string
    asset_name: string
    assigned_to: string
    base_id: string
    quantity?: number
    expended_quantity?: number
    assignment_date: Date | string
    status?: string
    notes?: string | null
    created_at?: Date | string | null
  }

  export type assignmentsCreateOrConnectWithoutUsersInput = {
    where: assignmentsWhereUniqueInput
    create: XOR<assignmentsCreateWithoutUsersInput, assignmentsUncheckedCreateWithoutUsersInput>
  }

  export type assignmentsCreateManyUsersInputEnvelope = {
    data: assignmentsCreateManyUsersInput | assignmentsCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type audit_logsCreateWithoutUsersInput = {
    id?: string
    action: string
    table_name: string
    record_id?: string | null
    old_values?: NullableJsonNullValueInput | InputJsonValue
    new_values?: NullableJsonNullValueInput | InputJsonValue
    ip_address?: string | null
    user_agent?: string | null
    created_at?: Date | string | null
  }

  export type audit_logsUncheckedCreateWithoutUsersInput = {
    id?: string
    action: string
    table_name: string
    record_id?: string | null
    old_values?: NullableJsonNullValueInput | InputJsonValue
    new_values?: NullableJsonNullValueInput | InputJsonValue
    ip_address?: string | null
    user_agent?: string | null
    created_at?: Date | string | null
  }

  export type audit_logsCreateOrConnectWithoutUsersInput = {
    where: audit_logsWhereUniqueInput
    create: XOR<audit_logsCreateWithoutUsersInput, audit_logsUncheckedCreateWithoutUsersInput>
  }

  export type audit_logsCreateManyUsersInputEnvelope = {
    data: audit_logsCreateManyUsersInput | audit_logsCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type basesCreateWithoutUsers_bases_commander_idTousersInput = {
    id?: string
    name: string
    code: string
    location: string
    is_active?: boolean | null
    created_at?: Date | string | null
    assets?: assetsCreateNestedManyWithoutBasesInput
    assignments?: assignmentsCreateNestedManyWithoutBasesInput
    expenditures?: expendituresCreateNestedManyWithoutBasesInput
    personnel?: personnelCreateNestedManyWithoutBasesInput
    purchases?: purchasesCreateNestedManyWithoutBasesInput
    transfers_transfers_from_base_idTobases?: transfersCreateNestedManyWithoutBases_transfers_from_base_idTobasesInput
    transfers_transfers_to_base_idTobases?: transfersCreateNestedManyWithoutBases_transfers_to_base_idTobasesInput
    users_users_base_idTobases?: usersCreateNestedManyWithoutBases_users_base_idTobasesInput
  }

  export type basesUncheckedCreateWithoutUsers_bases_commander_idTousersInput = {
    id?: string
    name: string
    code: string
    location: string
    is_active?: boolean | null
    created_at?: Date | string | null
    assets?: assetsUncheckedCreateNestedManyWithoutBasesInput
    assignments?: assignmentsUncheckedCreateNestedManyWithoutBasesInput
    expenditures?: expendituresUncheckedCreateNestedManyWithoutBasesInput
    personnel?: personnelUncheckedCreateNestedManyWithoutBasesInput
    purchases?: purchasesUncheckedCreateNestedManyWithoutBasesInput
    transfers_transfers_from_base_idTobases?: transfersUncheckedCreateNestedManyWithoutBases_transfers_from_base_idTobasesInput
    transfers_transfers_to_base_idTobases?: transfersUncheckedCreateNestedManyWithoutBases_transfers_to_base_idTobasesInput
    users_users_base_idTobases?: usersUncheckedCreateNestedManyWithoutBases_users_base_idTobasesInput
  }

  export type basesCreateOrConnectWithoutUsers_bases_commander_idTousersInput = {
    where: basesWhereUniqueInput
    create: XOR<basesCreateWithoutUsers_bases_commander_idTousersInput, basesUncheckedCreateWithoutUsers_bases_commander_idTousersInput>
  }

  export type basesCreateManyUsers_bases_commander_idTousersInputEnvelope = {
    data: basesCreateManyUsers_bases_commander_idTousersInput | basesCreateManyUsers_bases_commander_idTousersInput[]
    skipDuplicates?: boolean
  }

  export type expendituresCreateWithoutUsers_expenditures_authorized_byTousersInput = {
    id?: string
    asset_name: string
    quantity: number
    expenditure_date: Date | string
    reason: string
    notes?: string | null
    created_at?: Date | string | null
    bases: basesCreateNestedOneWithoutExpendituresInput
    users_expenditures_created_byTousers: usersCreateNestedOneWithoutExpenditures_expenditures_created_byTousersInput
    personnel?: personnelCreateNestedOneWithoutExpendituresInput
  }

  export type expendituresUncheckedCreateWithoutUsers_expenditures_authorized_byTousersInput = {
    id?: string
    asset_name: string
    base_id: string
    personnel_id?: string | null
    quantity: number
    expenditure_date: Date | string
    reason: string
    notes?: string | null
    created_by: string
    created_at?: Date | string | null
  }

  export type expendituresCreateOrConnectWithoutUsers_expenditures_authorized_byTousersInput = {
    where: expendituresWhereUniqueInput
    create: XOR<expendituresCreateWithoutUsers_expenditures_authorized_byTousersInput, expendituresUncheckedCreateWithoutUsers_expenditures_authorized_byTousersInput>
  }

  export type expendituresCreateManyUsers_expenditures_authorized_byTousersInputEnvelope = {
    data: expendituresCreateManyUsers_expenditures_authorized_byTousersInput | expendituresCreateManyUsers_expenditures_authorized_byTousersInput[]
    skipDuplicates?: boolean
  }

  export type expendituresCreateWithoutUsers_expenditures_created_byTousersInput = {
    id?: string
    asset_name: string
    quantity: number
    expenditure_date: Date | string
    reason: string
    notes?: string | null
    created_at?: Date | string | null
    users_expenditures_authorized_byTousers?: usersCreateNestedOneWithoutExpenditures_expenditures_authorized_byTousersInput
    bases: basesCreateNestedOneWithoutExpendituresInput
    personnel?: personnelCreateNestedOneWithoutExpendituresInput
  }

  export type expendituresUncheckedCreateWithoutUsers_expenditures_created_byTousersInput = {
    id?: string
    asset_name: string
    base_id: string
    personnel_id?: string | null
    quantity: number
    expenditure_date: Date | string
    reason: string
    authorized_by?: string | null
    notes?: string | null
    created_at?: Date | string | null
  }

  export type expendituresCreateOrConnectWithoutUsers_expenditures_created_byTousersInput = {
    where: expendituresWhereUniqueInput
    create: XOR<expendituresCreateWithoutUsers_expenditures_created_byTousersInput, expendituresUncheckedCreateWithoutUsers_expenditures_created_byTousersInput>
  }

  export type expendituresCreateManyUsers_expenditures_created_byTousersInputEnvelope = {
    data: expendituresCreateManyUsers_expenditures_created_byTousersInput | expendituresCreateManyUsers_expenditures_created_byTousersInput[]
    skipDuplicates?: boolean
  }

  export type purchasesCreateWithoutUsers_purchases_approved_byTousersInput = {
    id?: string
    quantity: number
    supplier?: string | null
    purchase_date: Date | string
    status?: string
    approved_at?: Date | string | null
    notes?: string | null
    created_at?: Date | string | null
    assets: assetsCreateNestedOneWithoutPurchasesInput
    bases: basesCreateNestedOneWithoutPurchasesInput
    users_purchases_created_byTousers: usersCreateNestedOneWithoutPurchases_purchases_created_byTousersInput
  }

  export type purchasesUncheckedCreateWithoutUsers_purchases_approved_byTousersInput = {
    id?: string
    asset_id: string
    base_id: string
    quantity: number
    supplier?: string | null
    purchase_date: Date | string
    status?: string
    approved_at?: Date | string | null
    notes?: string | null
    created_by: string
    created_at?: Date | string | null
  }

  export type purchasesCreateOrConnectWithoutUsers_purchases_approved_byTousersInput = {
    where: purchasesWhereUniqueInput
    create: XOR<purchasesCreateWithoutUsers_purchases_approved_byTousersInput, purchasesUncheckedCreateWithoutUsers_purchases_approved_byTousersInput>
  }

  export type purchasesCreateManyUsers_purchases_approved_byTousersInputEnvelope = {
    data: purchasesCreateManyUsers_purchases_approved_byTousersInput | purchasesCreateManyUsers_purchases_approved_byTousersInput[]
    skipDuplicates?: boolean
  }

  export type purchasesCreateWithoutUsers_purchases_created_byTousersInput = {
    id?: string
    quantity: number
    supplier?: string | null
    purchase_date: Date | string
    status?: string
    approved_at?: Date | string | null
    notes?: string | null
    created_at?: Date | string | null
    users_purchases_approved_byTousers?: usersCreateNestedOneWithoutPurchases_purchases_approved_byTousersInput
    assets: assetsCreateNestedOneWithoutPurchasesInput
    bases: basesCreateNestedOneWithoutPurchasesInput
  }

  export type purchasesUncheckedCreateWithoutUsers_purchases_created_byTousersInput = {
    id?: string
    asset_id: string
    base_id: string
    quantity: number
    supplier?: string | null
    purchase_date: Date | string
    status?: string
    approved_by?: string | null
    approved_at?: Date | string | null
    notes?: string | null
    created_at?: Date | string | null
  }

  export type purchasesCreateOrConnectWithoutUsers_purchases_created_byTousersInput = {
    where: purchasesWhereUniqueInput
    create: XOR<purchasesCreateWithoutUsers_purchases_created_byTousersInput, purchasesUncheckedCreateWithoutUsers_purchases_created_byTousersInput>
  }

  export type purchasesCreateManyUsers_purchases_created_byTousersInputEnvelope = {
    data: purchasesCreateManyUsers_purchases_created_byTousersInput | purchasesCreateManyUsers_purchases_created_byTousersInput[]
    skipDuplicates?: boolean
  }

  export type transfersCreateWithoutUsers_transfers_approved_byTousersInput = {
    id?: string
    transfer_number: string
    asset_name: string
    quantity: number
    transfer_date: Date | string
    status?: string
    approved_at?: Date | string | null
    notes?: string | null
    created_at?: Date | string | null
    users_transfers_created_byTousers: usersCreateNestedOneWithoutTransfers_transfers_created_byTousersInput
    bases_transfers_from_base_idTobases: basesCreateNestedOneWithoutTransfers_transfers_from_base_idTobasesInput
    bases_transfers_to_base_idTobases: basesCreateNestedOneWithoutTransfers_transfers_to_base_idTobasesInput
  }

  export type transfersUncheckedCreateWithoutUsers_transfers_approved_byTousersInput = {
    id?: string
    transfer_number: string
    from_base_id: string
    to_base_id: string
    asset_name: string
    quantity: number
    transfer_date: Date | string
    status?: string
    approved_at?: Date | string | null
    notes?: string | null
    created_by: string
    created_at?: Date | string | null
  }

  export type transfersCreateOrConnectWithoutUsers_transfers_approved_byTousersInput = {
    where: transfersWhereUniqueInput
    create: XOR<transfersCreateWithoutUsers_transfers_approved_byTousersInput, transfersUncheckedCreateWithoutUsers_transfers_approved_byTousersInput>
  }

  export type transfersCreateManyUsers_transfers_approved_byTousersInputEnvelope = {
    data: transfersCreateManyUsers_transfers_approved_byTousersInput | transfersCreateManyUsers_transfers_approved_byTousersInput[]
    skipDuplicates?: boolean
  }

  export type transfersCreateWithoutUsers_transfers_created_byTousersInput = {
    id?: string
    transfer_number: string
    asset_name: string
    quantity: number
    transfer_date: Date | string
    status?: string
    approved_at?: Date | string | null
    notes?: string | null
    created_at?: Date | string | null
    users_transfers_approved_byTousers?: usersCreateNestedOneWithoutTransfers_transfers_approved_byTousersInput
    bases_transfers_from_base_idTobases: basesCreateNestedOneWithoutTransfers_transfers_from_base_idTobasesInput
    bases_transfers_to_base_idTobases: basesCreateNestedOneWithoutTransfers_transfers_to_base_idTobasesInput
  }

  export type transfersUncheckedCreateWithoutUsers_transfers_created_byTousersInput = {
    id?: string
    transfer_number: string
    from_base_id: string
    to_base_id: string
    asset_name: string
    quantity: number
    transfer_date: Date | string
    status?: string
    approved_by?: string | null
    approved_at?: Date | string | null
    notes?: string | null
    created_at?: Date | string | null
  }

  export type transfersCreateOrConnectWithoutUsers_transfers_created_byTousersInput = {
    where: transfersWhereUniqueInput
    create: XOR<transfersCreateWithoutUsers_transfers_created_byTousersInput, transfersUncheckedCreateWithoutUsers_transfers_created_byTousersInput>
  }

  export type transfersCreateManyUsers_transfers_created_byTousersInputEnvelope = {
    data: transfersCreateManyUsers_transfers_created_byTousersInput | transfersCreateManyUsers_transfers_created_byTousersInput[]
    skipDuplicates?: boolean
  }

  export type basesCreateWithoutUsers_users_base_idTobasesInput = {
    id?: string
    name: string
    code: string
    location: string
    is_active?: boolean | null
    created_at?: Date | string | null
    assets?: assetsCreateNestedManyWithoutBasesInput
    assignments?: assignmentsCreateNestedManyWithoutBasesInput
    users_bases_commander_idTousers?: usersCreateNestedOneWithoutBases_bases_commander_idTousersInput
    expenditures?: expendituresCreateNestedManyWithoutBasesInput
    personnel?: personnelCreateNestedManyWithoutBasesInput
    purchases?: purchasesCreateNestedManyWithoutBasesInput
    transfers_transfers_from_base_idTobases?: transfersCreateNestedManyWithoutBases_transfers_from_base_idTobasesInput
    transfers_transfers_to_base_idTobases?: transfersCreateNestedManyWithoutBases_transfers_to_base_idTobasesInput
  }

  export type basesUncheckedCreateWithoutUsers_users_base_idTobasesInput = {
    id?: string
    name: string
    code: string
    location: string
    commander_id?: string | null
    is_active?: boolean | null
    created_at?: Date | string | null
    assets?: assetsUncheckedCreateNestedManyWithoutBasesInput
    assignments?: assignmentsUncheckedCreateNestedManyWithoutBasesInput
    expenditures?: expendituresUncheckedCreateNestedManyWithoutBasesInput
    personnel?: personnelUncheckedCreateNestedManyWithoutBasesInput
    purchases?: purchasesUncheckedCreateNestedManyWithoutBasesInput
    transfers_transfers_from_base_idTobases?: transfersUncheckedCreateNestedManyWithoutBases_transfers_from_base_idTobasesInput
    transfers_transfers_to_base_idTobases?: transfersUncheckedCreateNestedManyWithoutBases_transfers_to_base_idTobasesInput
  }

  export type basesCreateOrConnectWithoutUsers_users_base_idTobasesInput = {
    where: basesWhereUniqueInput
    create: XOR<basesCreateWithoutUsers_users_base_idTobasesInput, basesUncheckedCreateWithoutUsers_users_base_idTobasesInput>
  }

  export type assignmentsUpsertWithWhereUniqueWithoutUsersInput = {
    where: assignmentsWhereUniqueInput
    update: XOR<assignmentsUpdateWithoutUsersInput, assignmentsUncheckedUpdateWithoutUsersInput>
    create: XOR<assignmentsCreateWithoutUsersInput, assignmentsUncheckedCreateWithoutUsersInput>
  }

  export type assignmentsUpdateWithWhereUniqueWithoutUsersInput = {
    where: assignmentsWhereUniqueInput
    data: XOR<assignmentsUpdateWithoutUsersInput, assignmentsUncheckedUpdateWithoutUsersInput>
  }

  export type assignmentsUpdateManyWithWhereWithoutUsersInput = {
    where: assignmentsScalarWhereInput
    data: XOR<assignmentsUpdateManyMutationInput, assignmentsUncheckedUpdateManyWithoutUsersInput>
  }

  export type audit_logsUpsertWithWhereUniqueWithoutUsersInput = {
    where: audit_logsWhereUniqueInput
    update: XOR<audit_logsUpdateWithoutUsersInput, audit_logsUncheckedUpdateWithoutUsersInput>
    create: XOR<audit_logsCreateWithoutUsersInput, audit_logsUncheckedCreateWithoutUsersInput>
  }

  export type audit_logsUpdateWithWhereUniqueWithoutUsersInput = {
    where: audit_logsWhereUniqueInput
    data: XOR<audit_logsUpdateWithoutUsersInput, audit_logsUncheckedUpdateWithoutUsersInput>
  }

  export type audit_logsUpdateManyWithWhereWithoutUsersInput = {
    where: audit_logsScalarWhereInput
    data: XOR<audit_logsUpdateManyMutationInput, audit_logsUncheckedUpdateManyWithoutUsersInput>
  }

  export type audit_logsScalarWhereInput = {
    AND?: audit_logsScalarWhereInput | audit_logsScalarWhereInput[]
    OR?: audit_logsScalarWhereInput[]
    NOT?: audit_logsScalarWhereInput | audit_logsScalarWhereInput[]
    id?: UuidFilter<"audit_logs"> | string
    user_id?: UuidNullableFilter<"audit_logs"> | string | null
    action?: StringFilter<"audit_logs"> | string
    table_name?: StringFilter<"audit_logs"> | string
    record_id?: UuidNullableFilter<"audit_logs"> | string | null
    old_values?: JsonNullableFilter<"audit_logs">
    new_values?: JsonNullableFilter<"audit_logs">
    ip_address?: StringNullableFilter<"audit_logs"> | string | null
    user_agent?: StringNullableFilter<"audit_logs"> | string | null
    created_at?: DateTimeNullableFilter<"audit_logs"> | Date | string | null
  }

  export type basesUpsertWithWhereUniqueWithoutUsers_bases_commander_idTousersInput = {
    where: basesWhereUniqueInput
    update: XOR<basesUpdateWithoutUsers_bases_commander_idTousersInput, basesUncheckedUpdateWithoutUsers_bases_commander_idTousersInput>
    create: XOR<basesCreateWithoutUsers_bases_commander_idTousersInput, basesUncheckedCreateWithoutUsers_bases_commander_idTousersInput>
  }

  export type basesUpdateWithWhereUniqueWithoutUsers_bases_commander_idTousersInput = {
    where: basesWhereUniqueInput
    data: XOR<basesUpdateWithoutUsers_bases_commander_idTousersInput, basesUncheckedUpdateWithoutUsers_bases_commander_idTousersInput>
  }

  export type basesUpdateManyWithWhereWithoutUsers_bases_commander_idTousersInput = {
    where: basesScalarWhereInput
    data: XOR<basesUpdateManyMutationInput, basesUncheckedUpdateManyWithoutUsers_bases_commander_idTousersInput>
  }

  export type basesScalarWhereInput = {
    AND?: basesScalarWhereInput | basesScalarWhereInput[]
    OR?: basesScalarWhereInput[]
    NOT?: basesScalarWhereInput | basesScalarWhereInput[]
    id?: UuidFilter<"bases"> | string
    name?: StringFilter<"bases"> | string
    code?: StringFilter<"bases"> | string
    location?: StringFilter<"bases"> | string
    commander_id?: UuidNullableFilter<"bases"> | string | null
    is_active?: BoolNullableFilter<"bases"> | boolean | null
    created_at?: DateTimeNullableFilter<"bases"> | Date | string | null
  }

  export type expendituresUpsertWithWhereUniqueWithoutUsers_expenditures_authorized_byTousersInput = {
    where: expendituresWhereUniqueInput
    update: XOR<expendituresUpdateWithoutUsers_expenditures_authorized_byTousersInput, expendituresUncheckedUpdateWithoutUsers_expenditures_authorized_byTousersInput>
    create: XOR<expendituresCreateWithoutUsers_expenditures_authorized_byTousersInput, expendituresUncheckedCreateWithoutUsers_expenditures_authorized_byTousersInput>
  }

  export type expendituresUpdateWithWhereUniqueWithoutUsers_expenditures_authorized_byTousersInput = {
    where: expendituresWhereUniqueInput
    data: XOR<expendituresUpdateWithoutUsers_expenditures_authorized_byTousersInput, expendituresUncheckedUpdateWithoutUsers_expenditures_authorized_byTousersInput>
  }

  export type expendituresUpdateManyWithWhereWithoutUsers_expenditures_authorized_byTousersInput = {
    where: expendituresScalarWhereInput
    data: XOR<expendituresUpdateManyMutationInput, expendituresUncheckedUpdateManyWithoutUsers_expenditures_authorized_byTousersInput>
  }

  export type expendituresUpsertWithWhereUniqueWithoutUsers_expenditures_created_byTousersInput = {
    where: expendituresWhereUniqueInput
    update: XOR<expendituresUpdateWithoutUsers_expenditures_created_byTousersInput, expendituresUncheckedUpdateWithoutUsers_expenditures_created_byTousersInput>
    create: XOR<expendituresCreateWithoutUsers_expenditures_created_byTousersInput, expendituresUncheckedCreateWithoutUsers_expenditures_created_byTousersInput>
  }

  export type expendituresUpdateWithWhereUniqueWithoutUsers_expenditures_created_byTousersInput = {
    where: expendituresWhereUniqueInput
    data: XOR<expendituresUpdateWithoutUsers_expenditures_created_byTousersInput, expendituresUncheckedUpdateWithoutUsers_expenditures_created_byTousersInput>
  }

  export type expendituresUpdateManyWithWhereWithoutUsers_expenditures_created_byTousersInput = {
    where: expendituresScalarWhereInput
    data: XOR<expendituresUpdateManyMutationInput, expendituresUncheckedUpdateManyWithoutUsers_expenditures_created_byTousersInput>
  }

  export type purchasesUpsertWithWhereUniqueWithoutUsers_purchases_approved_byTousersInput = {
    where: purchasesWhereUniqueInput
    update: XOR<purchasesUpdateWithoutUsers_purchases_approved_byTousersInput, purchasesUncheckedUpdateWithoutUsers_purchases_approved_byTousersInput>
    create: XOR<purchasesCreateWithoutUsers_purchases_approved_byTousersInput, purchasesUncheckedCreateWithoutUsers_purchases_approved_byTousersInput>
  }

  export type purchasesUpdateWithWhereUniqueWithoutUsers_purchases_approved_byTousersInput = {
    where: purchasesWhereUniqueInput
    data: XOR<purchasesUpdateWithoutUsers_purchases_approved_byTousersInput, purchasesUncheckedUpdateWithoutUsers_purchases_approved_byTousersInput>
  }

  export type purchasesUpdateManyWithWhereWithoutUsers_purchases_approved_byTousersInput = {
    where: purchasesScalarWhereInput
    data: XOR<purchasesUpdateManyMutationInput, purchasesUncheckedUpdateManyWithoutUsers_purchases_approved_byTousersInput>
  }

  export type purchasesUpsertWithWhereUniqueWithoutUsers_purchases_created_byTousersInput = {
    where: purchasesWhereUniqueInput
    update: XOR<purchasesUpdateWithoutUsers_purchases_created_byTousersInput, purchasesUncheckedUpdateWithoutUsers_purchases_created_byTousersInput>
    create: XOR<purchasesCreateWithoutUsers_purchases_created_byTousersInput, purchasesUncheckedCreateWithoutUsers_purchases_created_byTousersInput>
  }

  export type purchasesUpdateWithWhereUniqueWithoutUsers_purchases_created_byTousersInput = {
    where: purchasesWhereUniqueInput
    data: XOR<purchasesUpdateWithoutUsers_purchases_created_byTousersInput, purchasesUncheckedUpdateWithoutUsers_purchases_created_byTousersInput>
  }

  export type purchasesUpdateManyWithWhereWithoutUsers_purchases_created_byTousersInput = {
    where: purchasesScalarWhereInput
    data: XOR<purchasesUpdateManyMutationInput, purchasesUncheckedUpdateManyWithoutUsers_purchases_created_byTousersInput>
  }

  export type transfersUpsertWithWhereUniqueWithoutUsers_transfers_approved_byTousersInput = {
    where: transfersWhereUniqueInput
    update: XOR<transfersUpdateWithoutUsers_transfers_approved_byTousersInput, transfersUncheckedUpdateWithoutUsers_transfers_approved_byTousersInput>
    create: XOR<transfersCreateWithoutUsers_transfers_approved_byTousersInput, transfersUncheckedCreateWithoutUsers_transfers_approved_byTousersInput>
  }

  export type transfersUpdateWithWhereUniqueWithoutUsers_transfers_approved_byTousersInput = {
    where: transfersWhereUniqueInput
    data: XOR<transfersUpdateWithoutUsers_transfers_approved_byTousersInput, transfersUncheckedUpdateWithoutUsers_transfers_approved_byTousersInput>
  }

  export type transfersUpdateManyWithWhereWithoutUsers_transfers_approved_byTousersInput = {
    where: transfersScalarWhereInput
    data: XOR<transfersUpdateManyMutationInput, transfersUncheckedUpdateManyWithoutUsers_transfers_approved_byTousersInput>
  }

  export type transfersUpsertWithWhereUniqueWithoutUsers_transfers_created_byTousersInput = {
    where: transfersWhereUniqueInput
    update: XOR<transfersUpdateWithoutUsers_transfers_created_byTousersInput, transfersUncheckedUpdateWithoutUsers_transfers_created_byTousersInput>
    create: XOR<transfersCreateWithoutUsers_transfers_created_byTousersInput, transfersUncheckedCreateWithoutUsers_transfers_created_byTousersInput>
  }

  export type transfersUpdateWithWhereUniqueWithoutUsers_transfers_created_byTousersInput = {
    where: transfersWhereUniqueInput
    data: XOR<transfersUpdateWithoutUsers_transfers_created_byTousersInput, transfersUncheckedUpdateWithoutUsers_transfers_created_byTousersInput>
  }

  export type transfersUpdateManyWithWhereWithoutUsers_transfers_created_byTousersInput = {
    where: transfersScalarWhereInput
    data: XOR<transfersUpdateManyMutationInput, transfersUncheckedUpdateManyWithoutUsers_transfers_created_byTousersInput>
  }

  export type basesUpsertWithoutUsers_users_base_idTobasesInput = {
    update: XOR<basesUpdateWithoutUsers_users_base_idTobasesInput, basesUncheckedUpdateWithoutUsers_users_base_idTobasesInput>
    create: XOR<basesCreateWithoutUsers_users_base_idTobasesInput, basesUncheckedCreateWithoutUsers_users_base_idTobasesInput>
    where?: basesWhereInput
  }

  export type basesUpdateToOneWithWhereWithoutUsers_users_base_idTobasesInput = {
    where?: basesWhereInput
    data: XOR<basesUpdateWithoutUsers_users_base_idTobasesInput, basesUncheckedUpdateWithoutUsers_users_base_idTobasesInput>
  }

  export type basesUpdateWithoutUsers_users_base_idTobasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assets?: assetsUpdateManyWithoutBasesNestedInput
    assignments?: assignmentsUpdateManyWithoutBasesNestedInput
    users_bases_commander_idTousers?: usersUpdateOneWithoutBases_bases_commander_idTousersNestedInput
    expenditures?: expendituresUpdateManyWithoutBasesNestedInput
    personnel?: personnelUpdateManyWithoutBasesNestedInput
    purchases?: purchasesUpdateManyWithoutBasesNestedInput
    transfers_transfers_from_base_idTobases?: transfersUpdateManyWithoutBases_transfers_from_base_idTobasesNestedInput
    transfers_transfers_to_base_idTobases?: transfersUpdateManyWithoutBases_transfers_to_base_idTobasesNestedInput
  }

  export type basesUncheckedUpdateWithoutUsers_users_base_idTobasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    commander_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assets?: assetsUncheckedUpdateManyWithoutBasesNestedInput
    assignments?: assignmentsUncheckedUpdateManyWithoutBasesNestedInput
    expenditures?: expendituresUncheckedUpdateManyWithoutBasesNestedInput
    personnel?: personnelUncheckedUpdateManyWithoutBasesNestedInput
    purchases?: purchasesUncheckedUpdateManyWithoutBasesNestedInput
    transfers_transfers_from_base_idTobases?: transfersUncheckedUpdateManyWithoutBases_transfers_from_base_idTobasesNestedInput
    transfers_transfers_to_base_idTobases?: transfersUncheckedUpdateManyWithoutBases_transfers_to_base_idTobasesNestedInput
  }

  export type purchasesCreateManyAssetsInput = {
    id?: string
    base_id: string
    quantity: number
    supplier?: string | null
    purchase_date: Date | string
    status?: string
    approved_by?: string | null
    approved_at?: Date | string | null
    notes?: string | null
    created_by: string
    created_at?: Date | string | null
  }

  export type purchasesUpdateWithoutAssetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    purchase_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users_purchases_approved_byTousers?: usersUpdateOneWithoutPurchases_purchases_approved_byTousersNestedInput
    bases?: basesUpdateOneRequiredWithoutPurchasesNestedInput
    users_purchases_created_byTousers?: usersUpdateOneRequiredWithoutPurchases_purchases_created_byTousersNestedInput
  }

  export type purchasesUncheckedUpdateWithoutAssetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    base_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    purchase_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type purchasesUncheckedUpdateManyWithoutAssetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    base_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    purchase_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type assetsCreateManyBasesInput = {
    id?: string
    name: string
    quantity?: number
    available_quantity?: number
    assigned_quantity?: number
    status?: string
    created_at?: Date | string | null
  }

  export type assignmentsCreateManyBasesInput = {
    id?: string
    asset_name: string
    assigned_to: string
    assigned_by: string
    quantity?: number
    expended_quantity?: number
    assignment_date: Date | string
    status?: string
    notes?: string | null
    created_at?: Date | string | null
  }

  export type expendituresCreateManyBasesInput = {
    id?: string
    asset_name: string
    personnel_id?: string | null
    quantity: number
    expenditure_date: Date | string
    reason: string
    authorized_by?: string | null
    notes?: string | null
    created_by: string
    created_at?: Date | string | null
  }

  export type personnelCreateManyBasesInput = {
    id?: string
    first_name: string
    last_name: string
    rank: string
    email?: string | null
    phone?: string | null
    department?: string | null
    is_active?: boolean | null
    created_at?: Date | string | null
  }

  export type purchasesCreateManyBasesInput = {
    id?: string
    asset_id: string
    quantity: number
    supplier?: string | null
    purchase_date: Date | string
    status?: string
    approved_by?: string | null
    approved_at?: Date | string | null
    notes?: string | null
    created_by: string
    created_at?: Date | string | null
  }

  export type transfersCreateManyBases_transfers_from_base_idTobasesInput = {
    id?: string
    transfer_number: string
    to_base_id: string
    asset_name: string
    quantity: number
    transfer_date: Date | string
    status?: string
    approved_by?: string | null
    approved_at?: Date | string | null
    notes?: string | null
    created_by: string
    created_at?: Date | string | null
  }

  export type transfersCreateManyBases_transfers_to_base_idTobasesInput = {
    id?: string
    transfer_number: string
    from_base_id: string
    asset_name: string
    quantity: number
    transfer_date: Date | string
    status?: string
    approved_by?: string | null
    approved_at?: Date | string | null
    notes?: string | null
    created_by: string
    created_at?: Date | string | null
  }

  export type usersCreateManyBases_users_base_idTobasesInput = {
    id?: string
    username: string
    email: string
    password_hash: string
    first_name: string
    last_name: string
    role: string
    is_active?: boolean | null
    created_at?: Date | string | null
  }

  export type assetsUpdateWithoutBasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    available_quantity?: IntFieldUpdateOperationsInput | number
    assigned_quantity?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    purchases?: purchasesUpdateManyWithoutAssetsNestedInput
  }

  export type assetsUncheckedUpdateWithoutBasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    available_quantity?: IntFieldUpdateOperationsInput | number
    assigned_quantity?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    purchases?: purchasesUncheckedUpdateManyWithoutAssetsNestedInput
  }

  export type assetsUncheckedUpdateManyWithoutBasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    available_quantity?: IntFieldUpdateOperationsInput | number
    assigned_quantity?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type assignmentsUpdateWithoutBasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    asset_name?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    expended_quantity?: IntFieldUpdateOperationsInput | number
    assignment_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: usersUpdateOneRequiredWithoutAssignmentsNestedInput
    personnel?: personnelUpdateOneRequiredWithoutAssignmentsNestedInput
  }

  export type assignmentsUncheckedUpdateWithoutBasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    asset_name?: StringFieldUpdateOperationsInput | string
    assigned_to?: StringFieldUpdateOperationsInput | string
    assigned_by?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    expended_quantity?: IntFieldUpdateOperationsInput | number
    assignment_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type assignmentsUncheckedUpdateManyWithoutBasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    asset_name?: StringFieldUpdateOperationsInput | string
    assigned_to?: StringFieldUpdateOperationsInput | string
    assigned_by?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    expended_quantity?: IntFieldUpdateOperationsInput | number
    assignment_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type expendituresUpdateWithoutBasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    asset_name?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    expenditure_date?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users_expenditures_authorized_byTousers?: usersUpdateOneWithoutExpenditures_expenditures_authorized_byTousersNestedInput
    users_expenditures_created_byTousers?: usersUpdateOneRequiredWithoutExpenditures_expenditures_created_byTousersNestedInput
    personnel?: personnelUpdateOneWithoutExpendituresNestedInput
  }

  export type expendituresUncheckedUpdateWithoutBasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    asset_name?: StringFieldUpdateOperationsInput | string
    personnel_id?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    expenditure_date?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: StringFieldUpdateOperationsInput | string
    authorized_by?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type expendituresUncheckedUpdateManyWithoutBasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    asset_name?: StringFieldUpdateOperationsInput | string
    personnel_id?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    expenditure_date?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: StringFieldUpdateOperationsInput | string
    authorized_by?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type personnelUpdateWithoutBasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    rank?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignments?: assignmentsUpdateManyWithoutPersonnelNestedInput
    expenditures?: expendituresUpdateManyWithoutPersonnelNestedInput
  }

  export type personnelUncheckedUpdateWithoutBasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    rank?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignments?: assignmentsUncheckedUpdateManyWithoutPersonnelNestedInput
    expenditures?: expendituresUncheckedUpdateManyWithoutPersonnelNestedInput
  }

  export type personnelUncheckedUpdateManyWithoutBasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    rank?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type purchasesUpdateWithoutBasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    purchase_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users_purchases_approved_byTousers?: usersUpdateOneWithoutPurchases_purchases_approved_byTousersNestedInput
    assets?: assetsUpdateOneRequiredWithoutPurchasesNestedInput
    users_purchases_created_byTousers?: usersUpdateOneRequiredWithoutPurchases_purchases_created_byTousersNestedInput
  }

  export type purchasesUncheckedUpdateWithoutBasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    asset_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    purchase_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type purchasesUncheckedUpdateManyWithoutBasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    asset_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    purchase_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type transfersUpdateWithoutBases_transfers_from_base_idTobasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    transfer_number?: StringFieldUpdateOperationsInput | string
    asset_name?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    transfer_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users_transfers_approved_byTousers?: usersUpdateOneWithoutTransfers_transfers_approved_byTousersNestedInput
    users_transfers_created_byTousers?: usersUpdateOneRequiredWithoutTransfers_transfers_created_byTousersNestedInput
    bases_transfers_to_base_idTobases?: basesUpdateOneRequiredWithoutTransfers_transfers_to_base_idTobasesNestedInput
  }

  export type transfersUncheckedUpdateWithoutBases_transfers_from_base_idTobasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    transfer_number?: StringFieldUpdateOperationsInput | string
    to_base_id?: StringFieldUpdateOperationsInput | string
    asset_name?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    transfer_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type transfersUncheckedUpdateManyWithoutBases_transfers_from_base_idTobasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    transfer_number?: StringFieldUpdateOperationsInput | string
    to_base_id?: StringFieldUpdateOperationsInput | string
    asset_name?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    transfer_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type transfersUpdateWithoutBases_transfers_to_base_idTobasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    transfer_number?: StringFieldUpdateOperationsInput | string
    asset_name?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    transfer_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users_transfers_approved_byTousers?: usersUpdateOneWithoutTransfers_transfers_approved_byTousersNestedInput
    users_transfers_created_byTousers?: usersUpdateOneRequiredWithoutTransfers_transfers_created_byTousersNestedInput
    bases_transfers_from_base_idTobases?: basesUpdateOneRequiredWithoutTransfers_transfers_from_base_idTobasesNestedInput
  }

  export type transfersUncheckedUpdateWithoutBases_transfers_to_base_idTobasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    transfer_number?: StringFieldUpdateOperationsInput | string
    from_base_id?: StringFieldUpdateOperationsInput | string
    asset_name?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    transfer_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type transfersUncheckedUpdateManyWithoutBases_transfers_to_base_idTobasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    transfer_number?: StringFieldUpdateOperationsInput | string
    from_base_id?: StringFieldUpdateOperationsInput | string
    asset_name?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    transfer_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type usersUpdateWithoutBases_users_base_idTobasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignments?: assignmentsUpdateManyWithoutUsersNestedInput
    audit_logs?: audit_logsUpdateManyWithoutUsersNestedInput
    bases_bases_commander_idTousers?: basesUpdateManyWithoutUsers_bases_commander_idTousersNestedInput
    expenditures_expenditures_authorized_byTousers?: expendituresUpdateManyWithoutUsers_expenditures_authorized_byTousersNestedInput
    expenditures_expenditures_created_byTousers?: expendituresUpdateManyWithoutUsers_expenditures_created_byTousersNestedInput
    purchases_purchases_approved_byTousers?: purchasesUpdateManyWithoutUsers_purchases_approved_byTousersNestedInput
    purchases_purchases_created_byTousers?: purchasesUpdateManyWithoutUsers_purchases_created_byTousersNestedInput
    transfers_transfers_approved_byTousers?: transfersUpdateManyWithoutUsers_transfers_approved_byTousersNestedInput
    transfers_transfers_created_byTousers?: transfersUpdateManyWithoutUsers_transfers_created_byTousersNestedInput
  }

  export type usersUncheckedUpdateWithoutBases_users_base_idTobasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignments?: assignmentsUncheckedUpdateManyWithoutUsersNestedInput
    audit_logs?: audit_logsUncheckedUpdateManyWithoutUsersNestedInput
    bases_bases_commander_idTousers?: basesUncheckedUpdateManyWithoutUsers_bases_commander_idTousersNestedInput
    expenditures_expenditures_authorized_byTousers?: expendituresUncheckedUpdateManyWithoutUsers_expenditures_authorized_byTousersNestedInput
    expenditures_expenditures_created_byTousers?: expendituresUncheckedUpdateManyWithoutUsers_expenditures_created_byTousersNestedInput
    purchases_purchases_approved_byTousers?: purchasesUncheckedUpdateManyWithoutUsers_purchases_approved_byTousersNestedInput
    purchases_purchases_created_byTousers?: purchasesUncheckedUpdateManyWithoutUsers_purchases_created_byTousersNestedInput
    transfers_transfers_approved_byTousers?: transfersUncheckedUpdateManyWithoutUsers_transfers_approved_byTousersNestedInput
    transfers_transfers_created_byTousers?: transfersUncheckedUpdateManyWithoutUsers_transfers_created_byTousersNestedInput
  }

  export type usersUncheckedUpdateManyWithoutBases_users_base_idTobasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type assignmentsCreateManyPersonnelInput = {
    id?: string
    asset_name: string
    assigned_by: string
    base_id: string
    quantity?: number
    expended_quantity?: number
    assignment_date: Date | string
    status?: string
    notes?: string | null
    created_at?: Date | string | null
  }

  export type expendituresCreateManyPersonnelInput = {
    id?: string
    asset_name: string
    base_id: string
    quantity: number
    expenditure_date: Date | string
    reason: string
    authorized_by?: string | null
    notes?: string | null
    created_by: string
    created_at?: Date | string | null
  }

  export type assignmentsUpdateWithoutPersonnelInput = {
    id?: StringFieldUpdateOperationsInput | string
    asset_name?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    expended_quantity?: IntFieldUpdateOperationsInput | number
    assignment_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: usersUpdateOneRequiredWithoutAssignmentsNestedInput
    bases?: basesUpdateOneRequiredWithoutAssignmentsNestedInput
  }

  export type assignmentsUncheckedUpdateWithoutPersonnelInput = {
    id?: StringFieldUpdateOperationsInput | string
    asset_name?: StringFieldUpdateOperationsInput | string
    assigned_by?: StringFieldUpdateOperationsInput | string
    base_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    expended_quantity?: IntFieldUpdateOperationsInput | number
    assignment_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type assignmentsUncheckedUpdateManyWithoutPersonnelInput = {
    id?: StringFieldUpdateOperationsInput | string
    asset_name?: StringFieldUpdateOperationsInput | string
    assigned_by?: StringFieldUpdateOperationsInput | string
    base_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    expended_quantity?: IntFieldUpdateOperationsInput | number
    assignment_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type expendituresUpdateWithoutPersonnelInput = {
    id?: StringFieldUpdateOperationsInput | string
    asset_name?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    expenditure_date?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users_expenditures_authorized_byTousers?: usersUpdateOneWithoutExpenditures_expenditures_authorized_byTousersNestedInput
    bases?: basesUpdateOneRequiredWithoutExpendituresNestedInput
    users_expenditures_created_byTousers?: usersUpdateOneRequiredWithoutExpenditures_expenditures_created_byTousersNestedInput
  }

  export type expendituresUncheckedUpdateWithoutPersonnelInput = {
    id?: StringFieldUpdateOperationsInput | string
    asset_name?: StringFieldUpdateOperationsInput | string
    base_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    expenditure_date?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: StringFieldUpdateOperationsInput | string
    authorized_by?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type expendituresUncheckedUpdateManyWithoutPersonnelInput = {
    id?: StringFieldUpdateOperationsInput | string
    asset_name?: StringFieldUpdateOperationsInput | string
    base_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    expenditure_date?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: StringFieldUpdateOperationsInput | string
    authorized_by?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type assignmentsCreateManyUsersInput = {
    id?: string
    asset_name: string
    assigned_to: string
    base_id: string
    quantity?: number
    expended_quantity?: number
    assignment_date: Date | string
    status?: string
    notes?: string | null
    created_at?: Date | string | null
  }

  export type audit_logsCreateManyUsersInput = {
    id?: string
    action: string
    table_name: string
    record_id?: string | null
    old_values?: NullableJsonNullValueInput | InputJsonValue
    new_values?: NullableJsonNullValueInput | InputJsonValue
    ip_address?: string | null
    user_agent?: string | null
    created_at?: Date | string | null
  }

  export type basesCreateManyUsers_bases_commander_idTousersInput = {
    id?: string
    name: string
    code: string
    location: string
    is_active?: boolean | null
    created_at?: Date | string | null
  }

  export type expendituresCreateManyUsers_expenditures_authorized_byTousersInput = {
    id?: string
    asset_name: string
    base_id: string
    personnel_id?: string | null
    quantity: number
    expenditure_date: Date | string
    reason: string
    notes?: string | null
    created_by: string
    created_at?: Date | string | null
  }

  export type expendituresCreateManyUsers_expenditures_created_byTousersInput = {
    id?: string
    asset_name: string
    base_id: string
    personnel_id?: string | null
    quantity: number
    expenditure_date: Date | string
    reason: string
    authorized_by?: string | null
    notes?: string | null
    created_at?: Date | string | null
  }

  export type purchasesCreateManyUsers_purchases_approved_byTousersInput = {
    id?: string
    asset_id: string
    base_id: string
    quantity: number
    supplier?: string | null
    purchase_date: Date | string
    status?: string
    approved_at?: Date | string | null
    notes?: string | null
    created_by: string
    created_at?: Date | string | null
  }

  export type purchasesCreateManyUsers_purchases_created_byTousersInput = {
    id?: string
    asset_id: string
    base_id: string
    quantity: number
    supplier?: string | null
    purchase_date: Date | string
    status?: string
    approved_by?: string | null
    approved_at?: Date | string | null
    notes?: string | null
    created_at?: Date | string | null
  }

  export type transfersCreateManyUsers_transfers_approved_byTousersInput = {
    id?: string
    transfer_number: string
    from_base_id: string
    to_base_id: string
    asset_name: string
    quantity: number
    transfer_date: Date | string
    status?: string
    approved_at?: Date | string | null
    notes?: string | null
    created_by: string
    created_at?: Date | string | null
  }

  export type transfersCreateManyUsers_transfers_created_byTousersInput = {
    id?: string
    transfer_number: string
    from_base_id: string
    to_base_id: string
    asset_name: string
    quantity: number
    transfer_date: Date | string
    status?: string
    approved_by?: string | null
    approved_at?: Date | string | null
    notes?: string | null
    created_at?: Date | string | null
  }

  export type assignmentsUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    asset_name?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    expended_quantity?: IntFieldUpdateOperationsInput | number
    assignment_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    personnel?: personnelUpdateOneRequiredWithoutAssignmentsNestedInput
    bases?: basesUpdateOneRequiredWithoutAssignmentsNestedInput
  }

  export type assignmentsUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    asset_name?: StringFieldUpdateOperationsInput | string
    assigned_to?: StringFieldUpdateOperationsInput | string
    base_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    expended_quantity?: IntFieldUpdateOperationsInput | number
    assignment_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type assignmentsUncheckedUpdateManyWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    asset_name?: StringFieldUpdateOperationsInput | string
    assigned_to?: StringFieldUpdateOperationsInput | string
    base_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    expended_quantity?: IntFieldUpdateOperationsInput | number
    assignment_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type audit_logsUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    table_name?: StringFieldUpdateOperationsInput | string
    record_id?: NullableStringFieldUpdateOperationsInput | string | null
    old_values?: NullableJsonNullValueInput | InputJsonValue
    new_values?: NullableJsonNullValueInput | InputJsonValue
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type audit_logsUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    table_name?: StringFieldUpdateOperationsInput | string
    record_id?: NullableStringFieldUpdateOperationsInput | string | null
    old_values?: NullableJsonNullValueInput | InputJsonValue
    new_values?: NullableJsonNullValueInput | InputJsonValue
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type audit_logsUncheckedUpdateManyWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    table_name?: StringFieldUpdateOperationsInput | string
    record_id?: NullableStringFieldUpdateOperationsInput | string | null
    old_values?: NullableJsonNullValueInput | InputJsonValue
    new_values?: NullableJsonNullValueInput | InputJsonValue
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type basesUpdateWithoutUsers_bases_commander_idTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assets?: assetsUpdateManyWithoutBasesNestedInput
    assignments?: assignmentsUpdateManyWithoutBasesNestedInput
    expenditures?: expendituresUpdateManyWithoutBasesNestedInput
    personnel?: personnelUpdateManyWithoutBasesNestedInput
    purchases?: purchasesUpdateManyWithoutBasesNestedInput
    transfers_transfers_from_base_idTobases?: transfersUpdateManyWithoutBases_transfers_from_base_idTobasesNestedInput
    transfers_transfers_to_base_idTobases?: transfersUpdateManyWithoutBases_transfers_to_base_idTobasesNestedInput
    users_users_base_idTobases?: usersUpdateManyWithoutBases_users_base_idTobasesNestedInput
  }

  export type basesUncheckedUpdateWithoutUsers_bases_commander_idTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assets?: assetsUncheckedUpdateManyWithoutBasesNestedInput
    assignments?: assignmentsUncheckedUpdateManyWithoutBasesNestedInput
    expenditures?: expendituresUncheckedUpdateManyWithoutBasesNestedInput
    personnel?: personnelUncheckedUpdateManyWithoutBasesNestedInput
    purchases?: purchasesUncheckedUpdateManyWithoutBasesNestedInput
    transfers_transfers_from_base_idTobases?: transfersUncheckedUpdateManyWithoutBases_transfers_from_base_idTobasesNestedInput
    transfers_transfers_to_base_idTobases?: transfersUncheckedUpdateManyWithoutBases_transfers_to_base_idTobasesNestedInput
    users_users_base_idTobases?: usersUncheckedUpdateManyWithoutBases_users_base_idTobasesNestedInput
  }

  export type basesUncheckedUpdateManyWithoutUsers_bases_commander_idTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type expendituresUpdateWithoutUsers_expenditures_authorized_byTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    asset_name?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    expenditure_date?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bases?: basesUpdateOneRequiredWithoutExpendituresNestedInput
    users_expenditures_created_byTousers?: usersUpdateOneRequiredWithoutExpenditures_expenditures_created_byTousersNestedInput
    personnel?: personnelUpdateOneWithoutExpendituresNestedInput
  }

  export type expendituresUncheckedUpdateWithoutUsers_expenditures_authorized_byTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    asset_name?: StringFieldUpdateOperationsInput | string
    base_id?: StringFieldUpdateOperationsInput | string
    personnel_id?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    expenditure_date?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type expendituresUncheckedUpdateManyWithoutUsers_expenditures_authorized_byTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    asset_name?: StringFieldUpdateOperationsInput | string
    base_id?: StringFieldUpdateOperationsInput | string
    personnel_id?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    expenditure_date?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type expendituresUpdateWithoutUsers_expenditures_created_byTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    asset_name?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    expenditure_date?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users_expenditures_authorized_byTousers?: usersUpdateOneWithoutExpenditures_expenditures_authorized_byTousersNestedInput
    bases?: basesUpdateOneRequiredWithoutExpendituresNestedInput
    personnel?: personnelUpdateOneWithoutExpendituresNestedInput
  }

  export type expendituresUncheckedUpdateWithoutUsers_expenditures_created_byTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    asset_name?: StringFieldUpdateOperationsInput | string
    base_id?: StringFieldUpdateOperationsInput | string
    personnel_id?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    expenditure_date?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: StringFieldUpdateOperationsInput | string
    authorized_by?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type expendituresUncheckedUpdateManyWithoutUsers_expenditures_created_byTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    asset_name?: StringFieldUpdateOperationsInput | string
    base_id?: StringFieldUpdateOperationsInput | string
    personnel_id?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: IntFieldUpdateOperationsInput | number
    expenditure_date?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: StringFieldUpdateOperationsInput | string
    authorized_by?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type purchasesUpdateWithoutUsers_purchases_approved_byTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    purchase_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assets?: assetsUpdateOneRequiredWithoutPurchasesNestedInput
    bases?: basesUpdateOneRequiredWithoutPurchasesNestedInput
    users_purchases_created_byTousers?: usersUpdateOneRequiredWithoutPurchases_purchases_created_byTousersNestedInput
  }

  export type purchasesUncheckedUpdateWithoutUsers_purchases_approved_byTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    asset_id?: StringFieldUpdateOperationsInput | string
    base_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    purchase_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type purchasesUncheckedUpdateManyWithoutUsers_purchases_approved_byTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    asset_id?: StringFieldUpdateOperationsInput | string
    base_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    purchase_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type purchasesUpdateWithoutUsers_purchases_created_byTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    purchase_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users_purchases_approved_byTousers?: usersUpdateOneWithoutPurchases_purchases_approved_byTousersNestedInput
    assets?: assetsUpdateOneRequiredWithoutPurchasesNestedInput
    bases?: basesUpdateOneRequiredWithoutPurchasesNestedInput
  }

  export type purchasesUncheckedUpdateWithoutUsers_purchases_created_byTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    asset_id?: StringFieldUpdateOperationsInput | string
    base_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    purchase_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type purchasesUncheckedUpdateManyWithoutUsers_purchases_created_byTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    asset_id?: StringFieldUpdateOperationsInput | string
    base_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    supplier?: NullableStringFieldUpdateOperationsInput | string | null
    purchase_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type transfersUpdateWithoutUsers_transfers_approved_byTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    transfer_number?: StringFieldUpdateOperationsInput | string
    asset_name?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    transfer_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users_transfers_created_byTousers?: usersUpdateOneRequiredWithoutTransfers_transfers_created_byTousersNestedInput
    bases_transfers_from_base_idTobases?: basesUpdateOneRequiredWithoutTransfers_transfers_from_base_idTobasesNestedInput
    bases_transfers_to_base_idTobases?: basesUpdateOneRequiredWithoutTransfers_transfers_to_base_idTobasesNestedInput
  }

  export type transfersUncheckedUpdateWithoutUsers_transfers_approved_byTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    transfer_number?: StringFieldUpdateOperationsInput | string
    from_base_id?: StringFieldUpdateOperationsInput | string
    to_base_id?: StringFieldUpdateOperationsInput | string
    asset_name?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    transfer_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type transfersUncheckedUpdateManyWithoutUsers_transfers_approved_byTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    transfer_number?: StringFieldUpdateOperationsInput | string
    from_base_id?: StringFieldUpdateOperationsInput | string
    to_base_id?: StringFieldUpdateOperationsInput | string
    asset_name?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    transfer_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type transfersUpdateWithoutUsers_transfers_created_byTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    transfer_number?: StringFieldUpdateOperationsInput | string
    asset_name?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    transfer_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users_transfers_approved_byTousers?: usersUpdateOneWithoutTransfers_transfers_approved_byTousersNestedInput
    bases_transfers_from_base_idTobases?: basesUpdateOneRequiredWithoutTransfers_transfers_from_base_idTobasesNestedInput
    bases_transfers_to_base_idTobases?: basesUpdateOneRequiredWithoutTransfers_transfers_to_base_idTobasesNestedInput
  }

  export type transfersUncheckedUpdateWithoutUsers_transfers_created_byTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    transfer_number?: StringFieldUpdateOperationsInput | string
    from_base_id?: StringFieldUpdateOperationsInput | string
    to_base_id?: StringFieldUpdateOperationsInput | string
    asset_name?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    transfer_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type transfersUncheckedUpdateManyWithoutUsers_transfers_created_byTousersInput = {
    id?: StringFieldUpdateOperationsInput | string
    transfer_number?: StringFieldUpdateOperationsInput | string
    from_base_id?: StringFieldUpdateOperationsInput | string
    to_base_id?: StringFieldUpdateOperationsInput | string
    asset_name?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    transfer_date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    approved_by?: NullableStringFieldUpdateOperationsInput | string | null
    approved_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}