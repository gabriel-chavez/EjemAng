namespace BCP.CredinetWeb.Core.Business
{
    using AutoMapper;
    using System.Collections.Generic;
    using System.Linq;

    public static class MapperExtensions
    {
        public static IMappingExpression<TSource, TDestination> IgnoreNullValues<TSource, TDestination>(
            this IMappingExpression<TSource, TDestination> mapperExpression)
        {
            mapperExpression.ForAllOtherMembers(source =>
            {
                source.Condition((s, d, sourceValue, destValue, rc) =>
                {
                    return sourceValue != null;
                });
            });
            return mapperExpression;
        }

        public static IMappingExpression<TSource, TDestination> IgnoreVirtualExtensions<TSource, TDestination>(
         this IMappingExpression<TSource, TDestination> mapperExpression)
        {
            foreach (var property in typeof(TDestination).GetProperties().Where(p => p.GetGetMethod().IsVirtual && !p.GetGetMethod().IsFinal))
            {
                mapperExpression.ForMember(property.Name, opt => opt.Ignore());
            }
            return mapperExpression;
        }
    }
}
