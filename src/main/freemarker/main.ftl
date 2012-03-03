<#-- @ftlvariable name="license" type="java.lang.String" -->
<#-- @ftlvariable name="body" type="java.lang.String" -->
<#assign licenseContent>
    <#include license?replace("\\", "/") parse=false>
</#assign>
/**
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 *
<#list licenseContent?split("[\r\n]", "r") as line>
 * ${line}
</#list>
 */
(function(){
<#include body?replace("\\", "/") parse=false>
})();